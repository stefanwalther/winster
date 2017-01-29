const Winston = require('winston');
const logLevels = require('./config-levels');

let logger;

class Logger {
  constructor(namespace) {
    this.options = {};
    this.options.namespace = namespace || {};
    this.winston = new (Winston.Logger)({
      level: logLevels.defaultLevel,
      levels: logLevels.levels,
      color: logLevels.colors
    });
    this.config();
  }

  // Allow easy instantiation by using `require('winster').instance()`
  static instance() {
    if (!logger) {
      logger = new Logger();
    }
    return logger;
  }

  config() {

    // Expose a method for each of the custom log levels
    for (const level in logLevels.levels) { // eslint-disable-line guard-for-in
      this[level] = function (msg, msgContext) {
        this.winston[level](msg, msgContext);
      };
    }



  }

  log(level, msg, context) {
    this.winston.log(level, msg, context);
  }

}

module.exports = Logger;
