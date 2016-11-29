# winster

> Ready to use logging module for node.js based on Winston.

## Why
Winston is a powerful logging framework but still needs some setup for every project.  
_winston_ builds on winston and winston-config and provides an opinionated setup of winston to be used within your projects with zero setup, but also allows to easily share winston configuration across projects.

## Install

```sh
$ npm install winster --save
```

## Usage

**Basic usage, zero configuration:**
```js
import winster as logger from 'winster';

logger.silly( 'Silly logging' );
logger.info( 'Some, whatever info' );

```


