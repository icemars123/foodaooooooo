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

      const docs = await Product.find(
        {
          'genre._id': req.query.id,
        }
      );

      const response = {
        count: docs.length,
        products: docs.map(
          doc => {
            return {
              _id: doc._id,
              dishName: doc.dishName,
              price: doc.price,
              unit: doc.unit,
              elements: doc.elements,
              tastes: doc.tastes,
              detail: doc.detail,
              imageName: doc.imageName,
              videoName: doc.videoName,
              isPublished: doc.isPublished,
              discount: doc.discount,
              genre: doc.genreId,
              link: doc.link,
              request: {
                type: "GET",
                url: "http://localhost:3000/api/products/" + doc._id
              }
            };
          }
        )
      };
      // check doc length
      if (docs.length <= 0)
        return res.status(404).json(
          {
            message: 'The product with this catagory was not found.'
          }
        );

      // // sent result by json
      // res.status(200).json(
      //   {
      //     product: doc,
      //     request: {
      //       type: "GET",
      //       description: "GET ALL products",
      //       url: "http://localhost:3000/api/products"
      //     }
      //   }
      // );
      // sent by json object
      res.status(200).json(response);

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