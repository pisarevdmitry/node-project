let config;
switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./prod');
    break;
  case 'test':
    config = require('./testConfig');
    break;
  default:
    config = require('./dev');
}

module.exports = config;
