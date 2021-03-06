'use strict';

const _ = require('lodash');
const utf8 = require('utf8');
const moment = require('moment');
const async = require('async');
const crypto = require('crypto');

const loggerConf = require('./initLogger');

exports.logger  = loggerConf.logger;
exports.loggerD = loggerConf.loggerD;

function sha1(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
}
exports.sha1 = sha1;

function md5(str) {
  return crypto.createHash('md5').update(utf8.encode(str)).digest('hex');
}
exports.md5 = md5;

function randomStr() {
  return crypto.randomBytes(16).toString('hex');
}
exports.randomStr = randomStr;

function timestamp() {
  return Date.now() / 1000 | 0;
}
exports.timestamp = timestamp;

exports.model = (name) => {
  return require(`../models/${name}`);
};

exports.service = (name) => {
  return require(`../services/${name}`);
};

function genCode(type, count) {
  let out = "";
  for (let i= 0; i < count; i++) {
    out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return type + out;
}
exports.genCode = genCode;

function genVerifyCode() {
  return Math.random().toString().substr(2, 4);
}
exports.genVerifyCode = genVerifyCode;
