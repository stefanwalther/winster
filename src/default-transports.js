const { format, transports } = require('winston');

// Note: you cannot have two transports of same kind and same level.
// This should actually be prevented when loading the transports.
/* istanbul ignore next */
const config = {
  development: [
    {
      transporter: transports.Console,
      options: {
        name: 'Console',
        level: 'trace',
        colorize: format.colorize(),
        json: format.json(),
        prettyPrint(object) {
          return JSON.stringify(object, null, 2);
        },
        handleExceptions: true,
      },
    },
  ],
};

module.exports = config;
