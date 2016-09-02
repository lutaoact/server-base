'use strict';
const APP = 'app';

module.exports = {
  redis: {
    token: {
      url: 'redis://localhost:6379',
      db: 0,
    },
    data: {
      url: 'redis://localhost:6379',
      db: 1,
    },
  },
  logger: {
    level: 'DEBUG',
  },
};
