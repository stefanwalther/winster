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

  static instance() {
    if (!logger) {
      logger = new Logger();
    }
    return logger;
  }


  config() {

    for (let level in logLevels.levels) {
      this[level] = function (msg, msgContext) {
        //this.log(level, msg, msgContext);
        this.winston[level](msg, msgContext);
      }
    }
  }

  log(level, msg, context) {
    this.winston.log(level, msg, context)
  }


}

module.exports = Logger;
