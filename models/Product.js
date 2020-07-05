/*
 *  Author: Gavin
 *  models/Product.js
 */
const { genreSchema } = require('./Genre');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

// create product schema
const productSchema = new mongoose.Schema(
  {
    dishName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: function () {
        return this.isPublished
      }
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    elements: {
      type: String,
      trim: true,
      required: true,
    },
    tastes: {
      type: [String],
      required: true,
    },
    detail: {
      type: String,
      trim: true,
      required: true,
    },
    imageName: {
      type: String,
      default: ""
    },
    videoName: {
      type: String,
      default: ""
    },
    isPublished: {
      type: Boolean,
      requried: true
    },
    discount: {
      type: String,
      default: ""
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    link: {
      type: [String],
      default: [""]
    }
  }
);

// create object
const Product = new mongoose.model('Product', productSchema);

// Validate product properties
function validateProduct(product) {
  const schema = Joi.object(
    {
      dishName: Joi.string().required(),
      price: Joi.number().required(),
      unit: Joi.string().required(),
      elements: Joi.string().required(),
      tastes: Joi.array().items(Joi.string().required()).required(),
      detail: Joi.string().required(),
      imageName: Joi.string(),
      videoName: Joi.string(),
      isPublished: Joi.boolean().required(),
      discount: Joi.string(),
      genreId: Joi.objectId().required(),
      link: Joi.array().items(Joi.string())
    }
  );

  return schema.validate(product);
}

exports.Product = Product;
exports.productSchema = productSchema;
exports.validateProduct = validateProduct;