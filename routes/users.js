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

// // Get user by id
// router.get(
//   '/:id',
//   async (req, res, next) => {

//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).send('The user with the given ID is not found');

//       res.send(user);

//     } catch (err) {
//       console.log(err)
//       res.status(500).json(
//         {
//           error: err
//         }
//       );
//       next();
//     }

//   }
// );


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


// Register user
router.post(
  '/register',
  async (req, res, next) => {

    // check sms random number


    const { password, password2 } = req.body;
    if (password !== password2) return res.status(400).send({ message: 'Passwords do not match' });

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

      let user = await User.findOne({ phone: req.body.phone });
      if (user) return res.status(400).json({ message: 'User already registered.' });

      user = new User(
        _.pick(
          req.body,
          [
            'name',
            'phone',
            'email',
            'password',
            'registerDate',
            'birth',
            'sex',
            'isAdmin'
          ]
        )
      );

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();

      // // Init JsonWebToken
      // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
      const token = user.generateAuthToken();

      // set header with token
      res.status(201).header(
        'x-auth-token',
        token
      ).json(
        {
          user
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

// Update user
router.put(
  '/:id',
  (req, res, next) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID is not found');

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    user.name = req.body.name;
    res.send(user);
  }
);

// Delete user
router.delete(
  '/:id',
  (req, res, next) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID is not found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
  }
);




module.exports = router;