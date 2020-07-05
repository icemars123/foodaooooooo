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



// Get all products
router.get(
  '/',
  async (req, res, next) => {
    try {
      // docs from db
      const docs = await Product.find();
      // construct object 
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

// Get product by id
router.get(
  '/:id',
  async (req, res, next) => {
    try {
      // doc is from db
      const doc = await Product.findById(req.params.id);
      // check doc length
      if (doc.length <= 0)
        return res.status(404).json(
          {
            message: 'The product with the given ID was not found.'
          }
        );

      // sent result by json
      res.status(200).json(
        {
          product: doc,
          request: {
            type: "GET",
            description: "GET ALL Mproducts",
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



// Create and add a product
router.post(
  '/',
  async (req, res, next) => {
    // Validate request body
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check genreId exists or not
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    let product = new Product(
      {
        dishName: req.body.dishName,
        price: req.body.price,
        unit: req.body.unit,
        elements: req.body.elements,
        tastes: req.body.tastes,
        detail: req.body.detail,
        imageName: req.body.imageName,
        videoName: req.body.videoName,
        isPublished: req.body.isPublished,
        discount: req.body.discount,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        link: req.body.link,
      }
    );

    try {
      // check category is unique or not
      const check = await Product.find({ category: req.body.dishName });
      if (check.length > 0) return res.status(409).send('The category already exist');

      product = await product.save();
      res.status(201).json(
        {
          message: 'Created product successfully',
          createdProduct: {
            dishName: product.dishName,
            price: product.price,
            unit: product.unit,
            elements: product.elements,
            tastes: product.tastes,
            detail: product.detail,
            imageName: product.imageName,
            videoName: product.videoName,
            isPublished: product.isPublished,
            discount: product.discount,
            genre: {
              _id: product.genre._id,
              name: product.genre.name
            },
            link: product.link,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/products/" + product._id
            }
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


// update a product by Id
router.put(
  '/:id',
  async (req, res, next) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      // check genreId exists or not
      const genre = await Genre.findById(req.body.genreId);
      if (!genre) return res.status(400).send('Invalid genre');
      // check category is unique or not
      const check = await Product.find({ dishName: req.body.dishName });
      if (check.length > 0) return res.status(409).send('The dishName already exist');

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          dishName: req.body.dishName,
          price: req.body.price,
          unit: req.body.unit,
          elements: req.body.elements,
          tastes: req.body.tastes,
          detail: req.body.detail,
          imageName: req.body.imageName,
          videoName: req.body.videoName,
          isPublished: req.body.isPublished,
          discount: req.body.discount,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          link: req.body.link,
        },
        {
          new: true
        }
      );

      if (product.length <= 0)
        return res.status(404).json(
          {
            message: 'The product with the given ID was not found.'
          }
        );

      res.status(200).json(
        {
          message: 'Product updated successfully',
          createdProduct: {
            dishName: product.dishName,
            price: product.price,
            unit: product.unit,
            elements: product.elements,
            tastes: product.tastes,
            detail: product.detail,
            imageName: product.imageName,
            videoName: product.videoName,
            isPublished: product.isPublished,
            discount: product.discount,
            genre: {
              _id: product.genre._id,
              name: product.genre.name
            },
            link: product.link,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/products/" + product._id
            }
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


router.patch(
  '/:id',
  async (req, res, patch) => {
    const updateOps = {};

    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateOps
      },
      {
        new: true
      }
    );

    if (product.length <= 0)
      return res.status(404).json(
        {
          message: 'The product with the given ID was not found.'
        }
      );

    res.status(200).json(
      {
        message: 'Product updated successfully',
        request: {
          type: "GET",
          url: "http://localhost:3000/api/products/" + product._id
        }
      }
    );

  }
);


// Delete a product
router.delete(
  '/:id',
  [Auth, Admin],
  async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send('The product with the given ID was not found.');

      res.status(200).json(
        {
          message: 'Product deleted successfully',
          request: {
            type: "POST",
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