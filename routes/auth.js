/*
 *  Author: Gavin
 *  routes/auth.js
 */
const CryptoJS = require("crypto-js");
const Admin = require('../middleware/Admin');
const Auth = require('../middleware/Auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/User');
const Joi = require('@hapi/joi');
const csurf = require('csurf');
const express = require('express');
// import controller
const { activateAccount } = require('../controllers/auth');

const router = express.Router();



// Create Authentication Token 
// for sign in
router.post(
  '/signin',
  async (req, res, next) => {
    // req.body = CryptoJS.AES.encrypt(JSON.stringify(req.body), config.get('cryptoKey')).toString();
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(req.body.password, config.get('cryptoKey'));
    req.body.password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const { error } = validateRequestLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

      let user = await User.findOne({ phone: req.body.phone });
      if (!user) return res.status(404).json({ message: 'Invalid phone number' });

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

      // Init to generate Authentication JsonWebToken
      const token = user.generateAuthToken()

      res.status(201).send({ message: 'True.', token });

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


// Do logout
router.post(
  '/logout',
  async (req, res, next) => {

    try {
      const { token } = req.body;
      if (!token) return res.status(404).json({ message: 'Bad Request' })
    } catch (err) {

    }

  }
);




// Register user
// sign up
router.post(
  '/signup',
  async (req, res, next) => {
    // check sms random number
    
    // const { password, password2 } = req.body;
    // if (password !== password2) return res.status(400).send({ message: 'Passwords do not match' });
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(req.body.password, config.get('cryptoKey'));
    req.body.password = bytes.toString(CryptoJS.enc.Utf8);

    // console.log(req.body.password);
    let parentChecked = false;
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

      let user = await User.findOne({ phone: req.body.phone });
      if (user) return res.status(400).json({ message: 'User already registered.' });

      if (req.body.parent) {
        let referrer = await User.findOne({ phone: req.body.parent });
        if (!referrer) return res.status(404).json({ message: 'Your referrer does not exist.' });
        parentChecked = true;
      }

      user = new User(
        _.pick(
          req.body,
          [
            'phone',
            'password',
            'primaryEmail',
            'passwordConfirmation',
            'subEmails',
            'resetLink',
            'name',
            'registerDate',
            'expiredDate',
            'birth',
            'gender',
            'address',
            'isAdmin',
            'credits',
            'voucher',
            'comments',
            'parent',
            'children'
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
          message: 'True',
          user,
          parentChecked
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



router.put(
  '/forgot-password/:phone',
  async (req, res, next) => {

    try {
      const { phone } = req.params.phone;

      const user = await User.findOne({ phone });
      if (!user) return res.status(404).send('The user with the phone is not found');


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




function validateRequestRegister(req) {
  const schema = Joi.object(
    {
      phone: Joi.string().required(),
      primaryEmail: Joi.string().email().required(),
      // password must contains 0-9, a-z, A-Z, signal
      password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/),
      // passwordConfirmation: Joi.string().valid(Joi.ref('password')).required(),
      gender: Joi.string().valid('male', 'female', 'gender diverse').required(),
    }
  );

  return schema.validate(req);
}


function validateRequestLogin(req) {
  const schema = Joi.object(
    {
      phone: Joi.string().required(),
      // primaryEmail: Joi.string().email().required(),
      // password must contains 0-9, a-z, A-Z, signal
      password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/),
    }
  );

  return schema.validate(req);
}


module.exports = router;