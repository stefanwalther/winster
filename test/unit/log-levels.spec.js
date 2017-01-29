/*global describe, it, beforeEach*/
const sinon = require('sinon');
const winston = require('winston');
const WinstonSpy = require('winston-spy');

const Winster = require('../../src/logger');
const logLevels = require('../../src/config-levels');
const _ = require('lodash');



describe('Log Levels', () => {

  let logger;
  let transport;
  let spy;

  beforeEach( () => {
    spy = sinon.spy();

    logger = new Winster();
    logger.winston.add(WinstonSpy, { spy: spy, level: logLevels.defaultLevel });
  });

  afterEach(() => {
    spy.reset();
  });

  it('are exposed as methods on root level', () => {
    for (let key in logLevels.levels) {
      expect(logger).to.have.property(key).to.be.a.function;
    }
  });

  it('spy works ...', function() {
    const testMessage = 'Hello World';
    const testMeta = { hello: 'world' };
    logger.log('info', testMessage, testMeta);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith('info', testMessage, testMeta));
  });

  it('streams the right output', () => {
    for (let key in logLevels.levels) {
      let testMessage = 'Hello World';
      let testMeta = { hello: 'world', level: key };
      logger[key](testMessage, testMeta);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(key, testMessage, testMeta)).to.be.true;
      spy.reset();
    }
  });

});
