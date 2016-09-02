'use strict';

const _ = require('lodash');
const config = require('config');
const request = require('request');
const utf8 = require('utf8');

/*
 * nodejs计算签名示例：
 * crypto.createHash('md5').update(utf8.encode(method + url + post_body + app_master_secret)).digest("hex");
 */

const _u = require('./util');
const logger = _u.logger;

const umengConfig = {
  ios: {
    appKey:  'appKey',
    appMasterSecret: 'appMasterSecret',
  },
  android: {
    appKey:  'appKey',
    appMasterSecret: 'appMasterSecret',
  },
};

const baseUrl = 'http://msg.umeng.com/api'

const urlMap = {
  send  : `${baseUrl}/send`,
  status: `${baseUrl}/status`,
};

function push(clientType, deviceTokens, alertObj, cb) {
  if (!cb) cb = _.noop;
  let packageData = buildPackageData(clientType, deviceTokens, alertObj);
  send(clientType, packageData, (err, body) => {
    if (err) return cb(err);
    logger.info({clientType, deviceTokens, content: alertObj.content, body});
    cb();
  });
}
exports.push = push;

function send(clientType, packageData, cb) {
  let url = urlMap.send;
  let sign = getSign(url, packageData, clientType);
  requestUmeng(url, sign, packageData, cb);
}

function getSign(url, packageData, clientType) {
  let method = 'POST';
  let postBody = JSON.stringify(packageData);
  let appMasterSecret = umengConfig[clientType].appMasterSecret;
  return _u.md5(method + url + postBody + appMasterSecret);
}

function requestUmeng(url, sign, body, cb) {
  request.post({
    url: url + '?sign=' + sign,
    body,
    json: true
  }, function (err, response, body) {
    cb(err, body);
  });
}

function buildPackageData(clientType, deviceTokens, alertObj) {
  let now = Date.now();
  let pkg = {
    appkey: umengConfig[clientType].appKey,
    timestamp: now,
    type: 'listcast',
    device_tokens: deviceTokens.join(','),
    payload: buildPayload(clientType, alertObj),
    production_mode: _u.isProduction,
    description: `${clientType} alarm`,
  };
  return pkg;
}

function buildPayload(clientType, alertObj) {
  switch (clientType) {
    case 'ios':
      return {
        aps: {alert: alertObj.content},
        pushData: JSON.stringify(alertObj.pushData),
      };
    case 'android':
      return {
        display_type: 'notification',
        body: {
          ticker: alertObj.content,
          title: alertObj.content,
          text: alertObj.content,
          builder_id: 0,
          after_open: 'go_custom',
          custom: JSON.stringify(alertObj.pushData),
        },
      };
  }
}
