'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: {type: String, default: ''},
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

userSchema.methods.apiRepr = function() {
  return {
    username: this.username,
    fullName: this.fullName
  };
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);