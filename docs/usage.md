
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