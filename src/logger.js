const Winston = require('winston');
const configLevels = require('./config-levels');

let logger;

class Logger {
  constructor(namespace) {
    this.options = {};
    this.options.namespace = namespace || {};
    this.winston = new (Winston.Logger)({
      levels: configLevels.levels,
      color: configLevels.colors
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


    for (let level in this.winston.levels) {
      this[level] = function (msg, msgContext) {
        this.log(level, msg, msgContext);
      }
    }
  }

  log(level, msg, context) {
    this.winston.log(level, msg, context)
  }


}

module.exports = Logger;
