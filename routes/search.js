/*
 *  Author: Gavin
 *  routes/products.js
 */
const Admin = require('../middleware/Admin');
const Auth = require('../middleware/Auth');
const { Genre } = require('../models/Genre');
const { Product, validateProduct } = require('../models/Product');
const bodyParer = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// Get products by genreId
router.get(
  '/',
  async (req, res, next) => {
    try {

      const doc = await Product.find(
        {
          'genre._id': req.query.id,
        }
      );

      // check doc length
      if (doc.length <= 0)
        return res.status(404).json(
          {
            message: 'The product with the price was not found.'
          }
        );

      // sent result by json
      res.status(200).json(
        {
          product: doc,
          request: {
            type: "GET",
            description: "GET ALL products",
            url: "http://localhost:3000/api/products"
          }
        }
      );

    } catch (err) {
      console.log(err)
      res.status(500).json(
        {
          error: err
        }
      );
      next();
    }
  }
);




module.exports = router;