'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.service');

const http = require('http');
const responsePrototype = http.ServerResponse.prototype;
responsePrototype.payload = function(payload) {
  this.json({message: 'ok', timestamp: Date.now(), payload});
};

const controller = require('../controllers/');

router.all('/', (req, res, next) => {
  res.page(10, {hello: 'girlfriend'});
});
//router.all('/', auth.isAuthenticated(), (req, res, next) => {
//  res.json({hello: 'girlfriend'});
//});

router.get('/version', controller.version);

module.exports = router;
