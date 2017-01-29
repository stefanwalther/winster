const sinon = require('sinon');
const WinstonSpy = require('winston-spy');

const Winster = require('../../src/logger');
const logLevels = require('./../../src/config-levels');
const defaultTransports = require('./../../src/default-transports');

describe('Transports', () => {
  let logger;

  beforeEach(() => {
    spy = sinon.spy();

    logger = new Winster();
    logger.winston.clear();
    logger.winston.add(WinstonSpy, {spy, level: logLevels.defaultLevel});
  });

  it('contains the defined transports for `development`', () => {
    let env = 'development';
    process.env.NODE_ENV = env;
    let devLogger = new Winster();

    defaultTransports[env].forEach( transportConfig => {
      expect(devLogger.winston.transports[transportConfig.options.name]).to.exist;
    });
  });

  it('works for an undefined environment', () => {
    let env = 'foo';
    process.env.NODE_ENV = 'foo';
    let fooLogger = new Winster();
    expect(fooLogger.winston.transports).to.be.empty;
  });
});
