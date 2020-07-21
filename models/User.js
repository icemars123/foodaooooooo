/*
 *  Author: Gavin
 *  models/User.js
 */
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');


// Init user
const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024
    },
    passwordConfirmation: {
      type: String,
      default: ''
    },
    primaryEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subEmails: {
      type: [String],
      default: [''],
    },
    resetLink: {
      data: String,
      default: '',
    },
    name: {
      type: JSON,
      properties: {
        userName: {
          type: String,
          trim: true,
          maxlength: 20,
          default: ''
        },
        firstName: {
          type: String,
          trim: true,
          maxlength: 11,
          default: ''
        },
        middleName: {
          type: String,
          trim: true,
          maxlength: 11,
          default: ''
        },
        lastName: {
          type: String,
          trim: true,
          maxlength: 11,
          default: ''
        }
      }
    },
    registerDate: {
      type: Date,
      default: Date.now
    },
    expiredDate: {
      type: Date,
      default: ''
    },
    birth: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'gender diverse']
    },
    address: {
      type: JSON,
      properties: {
        unit_number: {
          type: String,
          trim: true,
          default: '',
        },
        street_number: {
          type: String,
          trim: true,
          default: '',
        },
        street_name: {
          type: String,
          trim: true,
          default: '',
        },
        suburb: {
          type: String,
          trim: true,
          default: '',
        },
        city: {
          type: String,
          trim: true,
          default: '',
        },
        state: {
          type: String,
          uppercase: true,
          trim: true,
          default: '',
        },
        postcode: {
          type: String,
          trim: true,
          default: '',
        },
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    credits: {
      type: Number,
      default: 0.00
    },
    voucher: {
      type: Number,
      default: 0.00
    },
    comments: {
      type: [String],
      default: ['']
    },
    parent: {
      type: String,
      default: ''
    },
    children: {
      type: [String],
      default: ['']
    }
  },
  {
    timestamps: true
  }
);

// Init a methed for generating Authentication Token
userSchema.methods.generateAuthToken = function () {
  // Init JsonWebToken   
  const token = jwt.sign(
    {
      phone: this.phone,
      isAdmin: this.isAdmin
    },
    config.get('jwtPrivateKey')
  );

  return token;
}


const User = mongoose.model('User', userSchema);


function validateUser(user) {
  const schema = Joi.object(
    {
      // name: Joi.string().max(50).required(),
      phone: Joi.string().required(),
      // password must contains 0-9, a-z, A-Z, signal, {6, 16}
      password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')).required(),
      primaryEmail: Joi.string().email().required(),
      subEmails: Joi.array().items(Joi.string()),
      gender: Joi.string().valid('male', 'female','gender diverse').required(),
    }
  );

  return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;