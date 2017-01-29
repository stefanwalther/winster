/* global describe, expect, it, beforeEach, after, afterEach */
const Winster = require('./../../src/index');
const fs = require('fs');
const path = require('path');

describe('Transport configuration', () => {

  function removeWinsterFile() {
    let filePath = path.join(process.cwd(), '.winster.js');
    try {
      fs.statSync(filePath).isFile();
      fs.unlinkSync(filePath);
    }
    catch(err) {}
  }

  function placeWinsterFile() {
    copySync(path.join(process.cwd(), './src/default-transports.js'), path.join(process.cwd(), '.winster.js'))
  }

  function copySync(src, dest) {
    if (!fs.existsSync(src)) {
      return false;
    }

    let data = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, data);
  }

  function resetPackage() {
    let pkgFilePath = path.join(process.cwd(), 'package.json');
    let data = JSON.parse(fs.readFileSync(pkgFilePath), 'utf-8');
    delete data.winster;
    fs.writeFileSync(pkgFilePath, JSON.stringify(data, null, 2));
  }
  function enablePackage( configPath ) {
    let pkgFilePath = path.join(process.cwd(), 'package.json');
    let data = JSON.parse(fs.readFileSync(pkgFilePath), 'utf-8');
    data.winster = {
      config: configPath
    };
    fs.writeFileSync(pkgFilePath, JSON.stringify(data, null, 2));
  }

  // Reset package.json & delete .winster.js
  before(() => {
    removeWinsterFile();
    resetPackage();
  });

  // Reset package.json & delete .winster.js
  after(() => {
    removeWinsterFile();
    resetPackage();
  });

  describe('from package.json', () => {
    it('loads correctly', () => {
      enablePackage('./src/default-transports.js');
      let logger = new Winster();
      expect(logger._transportConfig).to.have.a.property('from').to.be.equal('package.json');
    });

    it('loads default configuration, if config file in package.json does not exist', () => {
      enablePackage('./src/default-transports-NOT-EXISTING.js');
      let logger = new Winster();
      expect(logger._transportConfig).to.have.a.property('from').to.be.equal('default');
    });

    it('loads default configuration, if winster section in package.json does not exist', () => {
      let logger = new Winster();
      expect(logger._transportConfig).to.have.a.property('from').to.be.equal('default');
    });
  });

  describe('from .winster.js', () => {

    beforeEach(() => {
      placeWinsterFile();
    });

    it('loads correctly', () => {
      let logger = new Winster();
      expect(logger._transportConfig).to.have.a.property('from').to.be.equal('.winster.js');
    });
  });

  describe('default', () => {

    before(() => {
      resetPackage();
      removeWinsterFile();
    });

    it('loads correctly', () => {
      let logger = new Winster();
      expect(logger._transportConfig).to.have.a.property('from').to.be.equal('default');
    })
  })

});
