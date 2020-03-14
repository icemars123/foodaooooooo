"use strict";

/*
 *  Author: Gavin
 *  models/Product.js
 */
var _require = require('./Genre'),
    genreSchema = _require.genreSchema;

var Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

var mongoose = require('mongoose'); // create product schema


var productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    minlength: 4
  },
  main_materials: {
    type: String,
    required: true
  },
  taste: {
    type: String,
    required: true
  },
  features: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean
  },
  price: {
    type: String,
    required: function required() {
      return this.isPublished;
    }
  },
  genre: {
    type: genreSchema,
    required: true
  }
}); // create object

var Product = new mongoose.model('Product', productSchema); // Validate product properties

function validateProduct(product) {
  var schema = Joi.object({
    category: Joi.string().required(),
    price: Joi.string().required(),
    main_materials: Joi.string().required(),
    taste: Joi.string().required(),
    features: Joi.string().required(),
    // isPublished: Joi.boolean().required(),
    genreId: Joi.objectId().required()
  });
  return schema.validate(product);
}

exports.Product = Product;
exports.productSchema = productSchema;
exports.validateProduct = validateProduct;