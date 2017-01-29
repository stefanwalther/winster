const Winston = require('winston');
const _ = require('lodash');
const readPkg = require('read-pkg');
const pkgDir = require('pkg-dir');
const fs = require('fs');
const path = require('path');

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

  /**
   * Determines which transport configuration file to use:
   *
   * - 1st fetch the configuration in package.json
   * - 2nd Look for a file called .winster.js in the project's root
   * - 3rd fall back to  ./src/default-transports.js
   *
   * @returns {*}
   * @private
   */
  _getTransportDefinition() {

    // 1st: fetch the configuration in package.json
    let pkg = readPkg.sync();
    if (pkg.winster && pkg.winster.config) {
      let configPkg = path.join(pkgDir.sync(), pkg.winster.config);
      if (fs.existsSync( configPkg)) {
        this._internalLog('[winster] Using transports as defined in package.json\r\n');
        return _.extend(require(configPkg), {from: 'package.json'});
      }
    }

    // 2nd: Look for a file called .winster.js in the project's root.
    let rootFile = path.join(process.cwd(), '.winster.js');
    if (fs.existsSync(rootFile)) {
      return _.extend(require(rootFile), {from: '.winster.js'});
    }

    return _.extend(defaultTransports, {from: 'default'});
  }

  /**
   * Logging for the internal stuff, where we cannot use Winster, yet.
   * @param msg
   * @private
   */
  _internalLog(msg) {
    if (process.env.WINSTER_SUPRESS_LOGGING !== 'true') {
      console.log(msg);
    }
  }

  _configTransports() {
    this._transportConfig = this._getTransportDefinition();
    let env = process.env.NODE_ENV;

    let transports = this._transportConfig[env];
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
