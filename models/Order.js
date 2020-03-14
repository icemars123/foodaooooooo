/*
 *  Author: Gavin
 *  models/Order.js
 */
const { Product } = require('./Product');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

// create order schema
const orderSchema = new mongoose.Schema(
  {
    products: {
      type: Array,
      items: {
        type: JSON,
        properties: {
          product: {
            type: new mongoose.Schema(
              {
                category: {
                  type: String,
                  required: true,
                  trim: true
                },
                price: {
                  type: String,
                  required: true,
                  trim: true
                }
              }
            ),
          },
          quantity: {
            type: Number,
            required: true,
            set: v => Math.round(v),
            get: v => Math.round(v)
          },
          // subTotal: {
          //   type: Number,
          //   required: true
          // }
        }
      },
      // validate: {
      //   // isAsync: true,
      //   validator: function (v) {
      //     return v && v.length > 0;
      //   },
      //   message: 'An order should have at least one product.'
      // }
    },
    date: {
      type: Date,
      default: Date.now
    },
    total: {
      type: Number,
      required: true
    }


    // product: {
    //   type: new mongoose.Schema(
    //     {
    //       category: {
    //         type: String,
    //         required: true,
    //         trim: true
    //       },
    //       price: {
    //         type: String,
    //         required: true,
    //         trim: true
    //       }
    //     }
    //   ),
    //   required: true
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   set: v => Math.round(v),
    //   get: v => Math.round(v)
    // },
    // subTotal: {
    //   type: Number,
    //   required: true
    // }
  }
);

// create object
const Order = new mongoose.model('Order', orderSchema);

// Validate order
function validateOrder(order) {
  const schema = Joi.object(
    {
      productId: Joi.objectId().required(),
      quantity: Joi.number().required(),
      // subTotal: Joi.number().required(),
      // total: Joi.number().required()
    }
  );

  return schema.validate(order);
}

function addOrder(oldOrder) {
  // Init properties for order
  this.items = oldOrder.items;
  this.totalQty = oldOrder.totalQty;
  this.totalPrice = oldOrder.totalPrice;

  // Add item
  this.add = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      // Create new one
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.price;
  };

  // Generate array for items
  this.generateArray = function (params) {
    // Init
    let array = [];
    for (let id in this.items) {
      array.push(this.items[id]) 
    }
    return array;
  };


}



exports.Order = Order;
exports.orderSchema = orderSchema;
exports.validateOrder = validateOrder;
exports.addOrder = addOrder;

