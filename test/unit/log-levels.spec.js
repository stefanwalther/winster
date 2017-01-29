/* global describe, expect, it, beforeEach */
const sinon = require('sinon');
const WinstonSpy = require('winston-spy');

const Winster = require('../../src/logger');
const logLevels = require('../../src/config-levels');
const _ = require('lodash');

describe('Log Levels', () => {

  let logger;
  let spy;

  beforeEach(() => {
    spy = sinon.spy();

    logger = new Winster();
    // logger.winston.transports.forEach( transport => {
    //   console.log(transport.name);
    //   console.log(transport);
    //   logger.winston.remove(transport.name);
    // });
    logger.winston.clear();
    logger.winston.add(WinstonSpy, {spy, level: logLevels.defaultLevel});
  });

  afterEach(() => {
    spy.reset();
  });

  it('are exposed as methods on root level', () => {

    // eslint-disable-next-line guard-for-in
    for (const key in logLevels.levels) {
      expect(logger).to.have.property(key).to.be.a.function;
    }
  });

  it('spy works ...', () => {
    const testMessage = 'Hello World';
    const testMeta = {hello: 'world'};
    logger.log('info', testMessage, testMeta);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith('info', testMessage, testMeta));
  });

  it('streams the right output', () => {

    // eslint-disable-next-line guard-for-in
    for (const key in logLevels.levels) {
      const testMessage = 'Hello World';
      const testMeta = {hello: 'world', level: key};
      logger[key](testMessage, testMeta);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(key, testMessage, testMeta)).to.be.true;
      spy.reset();
    }
  });


  it('returns the same logger when calling `instance()`', () => {
    let first = Winster.instance();
    let second = Winster.instance();
    expect(first).to.be.deep.equal(second);
  });

});
