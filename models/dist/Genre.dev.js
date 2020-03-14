"use strict";

/*
 *  Author: Gavin
 *  models/Genre.js
 */
var Joi = require('@hapi/joi');

var mongoose = require('mongoose'); // Init genre schema


var genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
}); // Create object

var Genre = new mongoose.model('Genre', genreSchema); // Validate genre properties

function validateGenre(genre) {
  var schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;