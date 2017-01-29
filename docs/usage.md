
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