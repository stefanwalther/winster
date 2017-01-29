const Winston = require('winston');
const _ = require('lodash');

const logLevels = require('./config-levels');
const defaultTransports = require('./default-transports');

let logger;

class Logger {
  constructor(namespace, context) {
    this.options = {};
    this.options.namespace = namespace || {};

    this.winston = new (Winston.Logger)({
      level: logLevels.defaultLevel,
      levels: logLevels.levels,
      color: logLevels.colors
    });
    this._config();
    this._configTransports();
  }

  // Allow easy instantiation by using `require('winster').instance()`
  static instance() {
    if (!logger) {
      logger = new Logger();
    }
    return logger;
  }

  _config() {

    // Expose a method for each of the custom log levels
    for (const level in logLevels.levels) { // eslint-disable-line guard-for-in
      this[level] = function (msg, msgContext) {
        this.winston[level](msg, msgContext);
      };
    }
  }

  _getTransportDefinition() {
    return defaultTransports;
  }

  _configTransports() {
    let transportConfig = this._getTransportDefinition();
    let env = process.env.NODE_ENV;

    let transports = transportConfig[env];
    let transportsList = _.map(transports, item => {
      return item.options.name;
    });
    // console.log('Adding ' + transports.length + ' transport(s) to ' + env + ': ' + transportsList + '\r\n');
    if (transports) {
      transports.forEach( item => {
        this.winston.add(item.transporter, item.options);
      });
    }
  }

  log(level, msg, context) {
    this.winston.log(level, msg, context);
  }

}

module.exports = Logger;
