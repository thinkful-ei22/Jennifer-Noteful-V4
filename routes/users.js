'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const {createUser} = require('../controllers/users.controllers');

// router.use(('/', passport.authenticate('jwt', { session: false, failWithError: true })));
router.post('/users', createUser);
module.exports = router;