'use strict';

const async = require('async');
const nodemailer = require('nodemailer');

const options = {
  service: 'QQex', auth: { user: 'xxx@lutaoact.com', pass: 'password' },
};
const transporter = nodemailer.createTransport(options);

//验证这个transporter是否有效
//transporter.verify(console.log);

function send(mailOpt, cb) {
  console.log('Send to: ', mailOpt.to);
  console.log('Subject: ', mailOpt.subject);

  mailOpt.from = `路涛<${options.auth.user}>`;
  transporter.sendMail(mailOpt, (err, info) => {
    console.log(err, info);
    cb(err, info);
  });
}

function retrySend(mailOpt, cb) {
  async.retry({times: 5, interval: 15000}, (_cb) => {//15秒之后重试
    send(mailOpt, _cb);
  }, cb);
}
exports.retrySend = retrySend;
