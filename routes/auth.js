'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');


const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

const createAuthToken = function(user){
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

router.post('/login', localAuth,(req, res) => {
  const authToken = createAuthToken(req.user);
  return res.json({authToken});
});

module.exports = router;