/*
 *  Author: Gavin
 *  models/Genre.js
 */

const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Init genre schema
const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    }
  }
);

// Create object
const Genre = new mongoose.model('Genre', genreSchema);

// Validate genre properties
function validateGenre(genre) {
  const schema = Joi.object(
    {
      name: Joi.string().min(3).required(),
    }
  );

  return schema.validate(genre);
}




exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;