'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true}
});

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (document, ret) =>{
    delete ret._id;
    delete ret.password;
  }
});