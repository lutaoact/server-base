'use strict';

const config = require('config');
const log4js = require('log4js');
const moment = require('moment');

/*
 * 自定义layout: json，会在category data中配置使用：
 *   const loggerD = log4js.getLogger('data')
 *   loggerD.info({a: 1, b: 2})
 *   输出的内容如下：
 *   2018-01-06T12:25:06+08:00 {"a":1,"b":2}
 */
log4js.addLayout('json', function(config) {
  return function(logEvent) {
    return Array.prototype.join.call([
      moment(logEvent.startTime).format(),
      JSON.stringify(logEvent.data[0]),
    ], " ");
  };
});

log4js.configure({
  appenders: {
    out: {type: 'stdout', layout: { type: 'colored' }},
    app: {
      type: 'dateFile',
      filename: config.logger.path,
      alwaysIncludePattern: false,
      pattern: ".yyyyMMdd",
      daysToKeep: 30,
    },
    json: {
      type: 'file',
      filename: config.logger.dataPath,
      layout: {type: 'json'},
      backups: 30,
    },
  },
  categories: {
    default: {appenders: ['out', 'app'], level: 'info'},
    data: {appenders: ['out', 'json'], level: 'info'},
  },
});

const logger = log4js.getLogger();
const loggerD = log4js.getLogger('data')

//取消注释可查看打印效果
//logger.info("hello world");
//loggerD.info({a: 1, b: 2})

exports.logger  = logger;
exports.loggerD = loggerD;
