"use strict";

/*
 *  Author: Gavin
 *  models/User.js
 */
var config = require('config');

var jwt = require('jsonwebtoken');

var Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

var mongoose = require('mongoose'); // Init user


var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  registerDate: {
    type: Date,
    "default": Date.now
  },
  birth: {
    type: String,
    "default": ""
  },
  sex: {
    type: String,
    "default": ""
  },
  isAdmin: {
    type: Boolean,
    "default": false
  }
}); // Init a methed for generating Authentication Token

userSchema.methods.generateAuthToken = function () {
  // Init JsonWebToken   
  var token = jwt.sign({
    phone: this.phone,
    isAdmin: this.isAdmin
  }, config.get('jwtPrivateKey'));
  return token;
};

var User = mongoose.model('User', userSchema);

function validateUser(user) {
  var schema = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().required(),
    email: Joi.string().email(),
    // password must contains 0-9, a-z, A-Z, signal
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/)
  });
  return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;