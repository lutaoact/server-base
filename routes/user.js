'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.service');

const controller = require('../controllers/user');

router.get('/me', auth.isAuthenticated(), controller.me);

module.exports = router;
