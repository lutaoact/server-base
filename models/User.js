'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
require('../common/connectMongo');
const _u = require('../common/util');

//手机号和微信unionid都可能为空，但都唯一，都应该建立唯一索引
let schema = new Schema({
  mobile: {
    $type: String,
    unique: true,
    sparse: true,
    validate: /\d{11}/,
  },
  unionid: {
    $type: String,
    unique: true,
    sparse: true,
  },
  nickname: String,
  profileImg: String,
  weixinProfile: {},
  recentClient: String,
}, {collection: 'user', timestamps: true, typeKey: '$type'});

schema.set('toObject', {virtuals: true});
schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);
