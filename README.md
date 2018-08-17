# winster
> Optionated logging library based on Winston.

[![NPM version](https://img.shields.io/npm/v/winster.svg?style=flat)](https://www.npmjs.com/package/winster)
[![David](https://img.shields.io/david/stefanwalther/winster.svg)](https://github.com/stefanwalther/winster)
[![CircleCI](https://img.shields.io/circleci/project/github/stefanwalther/winster.svg)](https://circleci.com/gh/stefanwalther/winster/tree/master)
[![codecov](https://codecov.io/gh/stefanwalther/winster/branch/master/graph/badge.svg)](https://codecov.io/gh/stefanwalther/winster)
[![XO code style](https://img.shields.io/badge/code_style-XO--space-5ed9c7.svg)](https://github.com/sindresorhus/eslint-config-xo-space)

## Motivation
Winston is a powerful logging framework but still needs some setup for every project.  
_Winster_ makes it easier to use logging with zero configuration in typical node.js projects.  

## Install
```sh
$ npm install winster --save
```

Note: _winster_ requires node.js 6.0 and higher.

## Usage
**Basic usage, zero configuration:**

```js
import winster as logger from 'winster';
const logger = require('winster').instance();

logger.trace('Some trace information ...');
logger.info('Some, whatever info ...');

```

### Log levels

_Winster_ uses slightly different logging levels compared to winston:

```js
logger.fatal('...');
logger.error('...');
logger.debug('...');
logger.warn('...');
logger.data('...');
logger.info('...');
logger.verbose('...');
logger.trace('...');
```

### Transporters

By default the pre-configured transports in `./src/default.transports.js` will be used.

You can configure your custom transport configuration, by:

**Prio 1**: Adding a section `winster` to your `package.json`, pointing to your configuration file:

```js
"winster": {
  "configFile": "./config/winster.js"
}
```

**Prio 2**: Placing a file called `.winster.json` or `.winster.js` to the root of your project.

Transporters can be defined by environment (`process.env.NODE_ENV`):

```js

const Winston = require('winston');

module.exports = {
  development: [
    {
      transporter: Winston.transports.Console,
      options: {
        name: 'Console',
        level: 'trace',
        colorize: true,
        json: false,
        prettyPrint(object) {
          return JSON.stringify(object, null, 2);
        },
        handleExceptions: true
      }
    }
  ],
  production: [
    {
      transporter: Winston.transports.File,
      options: {
        name: 'File',
        filename: 'foo.log'
      }
    }
  ],
  test: [
    // your transports for test
  ]
};
```

If no matching environment-section can be found in your configuration file, no transports will be added.

## Author
**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License
MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on August 17, 2018._

