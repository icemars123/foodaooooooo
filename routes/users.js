/*
 *  Author: Gavin
 *  routes/users.js
 */
const Admin = require('../middleware/Admin');
const Auth = require('../middleware/Auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/User');
const csurf = require('csurf');
const express = require('express');

const router = express.Router();


// Get all users
router.get(
  '/',
  [Admin, Auth],
  async (req, res, next) => {
    try {
      const docs = await User.find();

      res.status(200).json(
        {
          message: 'Handling GET requests to /users.',
          docs
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

// Get user by id
router.get(
  '/:id',
  [Admin, Auth],
  async (req, res, next) => {

    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send('The user with the given ID is not found');

      res.send(user);

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


// Get the current user
router.get(
  '/me',
  Auth,
  async (req, res, next) => {
    try {

      const user = await User.findOne({ phone: req.user.phone }).select('-password');
      if (!user) {
        return res.status(404).send('The user with the given ID is not found.');
      }
      res.status(200).send(user);

    } catch (err) {
      res.status(500).json(
        {
          error: err
        }
      );
      next();
    }
  }
);



// Update user for voucher
router.put(
  '/getvoucher/:phone',
  async (req, res, next) => {

    try {
      // const { phone } = req.params.phone;

      // const user = await User.findOne({ phone });
      // if (!user) return res.status(404).send('The user with the phone is not found');

      await User.findOneAndUpdate
        (
          { phone: req.params.phone },
          { $inc: { voucher: 10 } },
          function (
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });


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


// Update user for forget-password
router.put(
  '/forget-password/:phone',
  async (req, res, next) => {

    
    try {

      await User.findOneAndUpdate
        (
          { phone: req.params.phone },
          {
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
          },
          function (
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });


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



// Delete user
router.delete(
  '/:id',
  [Admin, Auth],
  (req, res, next) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID is not found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
  }
);




module.exports = router;