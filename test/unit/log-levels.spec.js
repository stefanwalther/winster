/*global describe, it, beforeEach*/
const sinon = require('sinon');
const winston = require('winston');

const Winster = require('../../src/logger');
const logLevels = require('../../src/config-levels');
const _ = require('lodash');

describe( 'Log Levels', () => {

  let logger;
  let transport;

  beforeEach(function () {
    spy = sinon.spy();

    transport = new (winston.transports.Memory)({
      json: true,
      stringify: true,
      level: 'trace'
    });

    // logger = new Winston.Logger({
    //   transports: [new WinstonSpy({ spy: spy })]
    // });
    logger = new Winster();
    logger.winston.transports = [transport];
  });

  it( 'has a method for each log level', () => {
    for (let key in logLevels.levels) {
      expect(logger).to.have.property(key).to.be.a.function;
    }
  } );

} );
