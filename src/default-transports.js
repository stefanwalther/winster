const Winston = require('winston');

const config = {
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
    },
    {
      transporter: Winston.transports.Console,
      options: {
        name: 'ConsoleError',
        level: 'error',
        colorize: true,
        json: false
      }
    }
  ]
};

module.exports = config;
