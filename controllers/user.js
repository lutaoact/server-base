'use strict';

const _ = require('lodash');
const async = require('async');
const _u = require('../common/util');
const loggerD = _u.loggerD;
const logger = _u.logger;
const eLog = _u.eLog;
const User = _u.model('User');
const AppErr = require('../common/AppErr');
const moment = require('moment');

exports.me = (req, res, next) => {
  res.payload(req.user);
};
