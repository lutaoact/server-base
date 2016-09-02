'use strict';

const _ = require('lodash');
const moment = require('moment');
const _u = require('../common/util');
const loggerD = _u.loggerD;
const logger = _u.logger;
const User = _u.model('User');

const map = {
  mobile: (options) => {
    let mobile = options.mobile;
    return {
      conditions: {mobile},
      dataForCreate: {
        mobile,
        recentClient: options.recentClient,
      },
    };
  },
  weixin: (options) => {
    let unionid = options.unionid;
    return {
      conditions: {unionid},
      dataForCreate: {
        unionid,
        nickname: options.profile.displayName,
        profileImg: options.profile.profileUrl,
        weixinProfile: options.profile,
        recentClient: 'wx',
      },
    };
  },
};

function buildData(type, options) {
  return map[type](options);
}

/* 获取用户：
 * * 检查用户是否存在
 * * 若不存在，则新建
 * * type暂时分两种：mobile weixin
 */
exports.getUser = (type, options, cb) => {
  let data = buildData(type, options);
  _u.mySeries({
    existedUser: (_cb) => {
      User.findOne(data.conditions, _cb);
    },
    user: (_cb, ret) => {
      if (ret.existedUser) {
        if (options.recentClient) {
          ret.existedUser.recentClient = options.recentClient;
          return ret.existedUser.save((err) => {
            _cb(err, ret.existedUser.toObject());
          });
        }
        return _cb(null, ret.existedUser.toObject());
      }
      loggerD.write({type: 'createUser', data});
      User.create(data.dataForCreate, (err, user) => {
        if (err) return _cb(err);
        user = user.toObject();
        user.isNewCreated = true;//标识新用户
        messageService.processSystemMessage([user._id], 'register');
        _cb(null, user);
      });
    },
  }, (err, ret) => {
    cb(err, ret.user);
  });
};
