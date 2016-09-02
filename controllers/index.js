'use strict';

const fs = require('fs');

const _u = require('../common/util');
const User = _u.model('User');

exports.version = (req, res, next) => {
  res.send('0.0.1');
};
