'use strict';
let moment = require('moment');

const APP = 'app';

module.exports = {
  appName: APP,
  port: 11111,
  mongo: {
    uri : `mongodb://localhost:27017/${APP}`,
  },
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
  logging: {
    accessLog: {
      filename: `/data/log/${APP}.access.log`,
      frequency: 'daily',
      date_format: 'YYYYMMDD',
      verbose: true,
    },
    errorLog: `/data/log/${APP}.error.log`,
    format: ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  },
  logger: {
    path: `/data/log/${APP}.log`,
    eLog: `/data/log/${APP}.eLog`,
    dataPath: `/data/log/${APP}.data.log`,
    level: 'INFO',
  },
  secrets: {
    session: '56a109bb0f0deedb0b147bf10bad6136a91559fc'
  },
  pageInfo: {
    perPage: 10,
  },
//  weixin: {
//    clientID    : 'wx30d94f7d2934ebc9',
//    clientSecret: '596d96b649354e30c453b0d750614e02',
//    callbackURL : 'http://xxx.lutaoact.com/auth/weixinLogin',
//  },
  mail: {
    to: 'xxx@xxxx.com',
  },
};
