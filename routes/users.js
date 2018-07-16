'use strict';

const express = require('express');
const User = require('../models/user');
const router = express.Router();



router.post('/users', (req, res, next)=>{
  let {fullName, username, password} = req.body;
  //validate that all required fields complete

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  
  if(missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  //validate that all inputs are strings

  const stringFields = [fullName, username, password];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  
  if(nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrectfield type: expected string',
      location: nonStringField
    });
  }
  //validate that there is no beginning or ending whitespace in UN or PW

  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  //validate the correct length of UN and PW
  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 8,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }
  
  //hash the password and input the user with hashed PW in db.
  return User.hashPassword(password)
    .then(digest => {
      return User.create({
        username,
        password: digest,
        fullName
      })
        .then(user => {
          return res.status(201).location(`/api/users/${user.id}`).json(user.apiRepr());//returned user will not display the PW
        })
        .catch(err => {
          if(err.coe === 11000) {
            err = new Error('The username already exists');
            err.status = 400;
          }
          next(err);
        });
    });
});









module.exports = router;