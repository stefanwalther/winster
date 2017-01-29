'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _winston6 = require('winston');

var winston = _interopRequireWildcard(_winston6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOpts = {
  name: 'debug-console',
  level: 'silly',
  colorize: true,
  prettyPrint: function prettyPrint(object) {
    return JSON.stringify(object, null, 2);
  },
  handleExceptions: true,
  json: false
};

var winster = function () {
  function winster() {
    _classCallCheck(this, winster);

    if (process.env.NODE_ENV === 'test') {
      this.winston = new winston.Logger({
        transports: [new winston.transports.File({ filename: 'foo.log' })]
      });
    } else {
      this.winston = new winston.Logger({
        transports: [new winston.transports.Console(defaultOpts)]
      });
    }
  }

  _createClass(winster, [{
    key: 'silly',
    value: function silly(message) {
      var _winston;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_winston = this.winston).silly.apply(_winston, [message].concat(args));
    }
  }, {
    key: 'debug',
    value: function debug(message) {
      var _winston2;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_winston2 = this.winston).debug.apply(_winston2, [message].concat(args));
    }
  }, {
    key: 'verbose',
    value: function verbose(message) {
      var _winston3;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      (_winston3 = this.winston).verbose.apply(_winston3, [message].concat(args));
    }
  }, {
    key: 'info',
    value: function info(message) {
      var _winston4;

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      (_winston4 = this.winston).info.apply(_winston4, [message].concat(args));
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      var _winston5;

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      (_winston5 = this.winston).warn.apply(_winston5, [message].concat(args));
    }

    // Highest level

  }, {
    key: 'error',
    value: function error(err) {
      this.winston.error(err);
    }
  }]);

  return winster;
}();

// Fix to include a line break into the log
// See: https://github.com/winstonjs/winston/issues/460


exports.default = winster;
winster.log = function () {
  var args = arguments;
  args[1] = args[1] + '\r\n';
  winston.Logger.prototype.log.apply(this, args);
};
//# sourceMappingURL=index.js.map
