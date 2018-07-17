'use strict';

const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('../config');

const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),//read the token 
  algorithms: ['HS256']//transform the token
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {//payload has user data
  done(null, payload.user);
});//decode the token for the server


module.exports = jwtStrategy;