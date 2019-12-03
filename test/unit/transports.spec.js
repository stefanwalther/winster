/* global describe, expect, it, beforeEach */
const sinon = require('sinon');
const WinstonSpy = require('@chrisalderson/winston-spy');
const LegacyTransport = require('winston-transport/legacy');

const Winster = require('../../index');
const logLevels = require('./../../src/config-levels');
const defaultTransports = require('./../../src/default-transports');

xdescribe('Transports', () => {
  let logger;
  let spy;

  beforeEach(() => {
    spy = sinon.spy();

    logger = new Winster();

    // winston@2.x.x
    // logger.winston.clear();
    // logger.winston.add(WinstonSpy, { spy, level: logLevels.defaultLevel });

    // winston@3.x.x
    consoleTransport = new logger.winston.transports.Console({
      silent: true,
    });
    spyTransport = new LegacyTransport({
      transport: new spyLogger({ spy }),
    });
    logger.winston.add(consoleTransport);
    logger.winston.add(spyTransport);
  });

  xit('contains the defined transports for `development`', () => {
    const env = 'development';
    process.env.NODE_ENV = env;
    const devLogger = new Winster();

    defaultTransports[env].forEach(transportConfig => {
      expect(devLogger.winston.transports[transportConfig.options.name]).to
        .exist;
    });
  });

  xit('works for an undefined environment', () => {
    const env = 'foo';
    process.env.NODE_ENV = env;
    const fooLogger = new Winster();
    expect(fooLogger.winston.transports).to.be.empty;
  });
});
