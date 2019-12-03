/* global describe, expect, it, beforeEach */
const sinon = require('sinon');
const spyLogger = require('@chrisalderson/winston-spy');
const LegacyTransport = require('winston-transport/legacy');
const transports = require('winston-transport');

const Winster = require('../../index');
const logLevels = require('../../src/config-levels');
const winston = require('winston');

describe('Log Levels', () => {
  let logger;
  const spy = sinon.spy();
  let consoleTransport;
  let spyTransport;

  beforeEach(() => {
    logger = new Winster();

    consoleTransport = new transports({
      silent: true,
    });
    spyTransport = new LegacyTransport({
      transport: new spyLogger({ spy }),
    });
    logger.winston.add(consoleTransport);
    logger.winston.add(spyTransport);
  });

  afterEach(() => {
    spy.resetHistory();

    logger.winston.remove(consoleTransport);
    logger.winston.remove(spyTransport);
  });

  it('are exposed as methods on root level', () => {
    // eslint-disable-next-line guard-for-in
    for (const key in logLevels.levels) {
      expect(logger)
        .to.have.property(key)
        .to.be.a('function');
    }
  });

  it('spy works ...', () => {
    const testMessage = 'Hello World';
    const testMeta = { hello: 'world' };
    logger.log('info', testMessage, testMeta);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith('info', testMessage, testMeta));
  });

  it('streams the right output', () => {
    // eslint-disable-next-line guard-for-in
    for (const key in logLevels.levels) {
      const testMessage = 'Hello World';
      const testMeta = { hello: 'world', level: key };
      logger[key](testMessage, testMeta);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(key, testMessage, testMeta)).to.be.true;
      spy.resetHistory();
    }
  });

  it('returns the same logger when calling `instance()`', () => {
    const first = Winster.instance();
    const second = Winster.instance();
    expect(first).to.be.deep.equal(second);
  });
});
