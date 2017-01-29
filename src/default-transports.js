const Winston = require('winston');

const config = {
  development: [{
    transporter: Winston.transports.Console,
    options: {
      name: 'Console',
      level: 'info',
      colorize: true,
      json: false
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
    }]
};

module.exports = config;
