/*
 *  Author: Gavin
 *  routes/orders.js
 */
const Auth = require('../middleware/Auth');
const { Product } = require('../models/Product');
const { Order, validateOrder, addOrder } = require('../models/Order');
const express = require('express');
const router = express.Router();

// Get All orders
router.get(
  '/',
  async (req, res, next) => {

    try {

      const docs = await Order.find();

      const response = {
        count: docs.length,
        orders: docs
      };

      res.status(200).json(
        {
          message: 'Handling GET requests to /products.',
          response
        }
      );

    } catch (ex) {
      for (field in ex.errors) {
        console.log(ex.errors[field].message);
      }
      next();
    }

  }
);

// Add product to order
router.get(
  '/:productId',
  async (req, res, next) => {

    const productId = req.params.productId;

    let order = new addOrder(req.session.order ? req.session.order : {});

    const product = await Product.findById(productId);
    if (product <= 0) return res.status(400).send('Invalid product.');

    card.add(product, product._id);

    res.status(200).json(
      {
        message: 'The Order details',
        orderId: req.params.orderId
      }
    );
  }
);





// Create a new order
router.post(
  '/',
  Auth,
  async (req, res, next) => {
    // Validate request body

    let items = [];

    for (const item of req.body.products) {
      const { error } = validateOrder(item);
      if (error) return res.status(400).send(error.details[0].message);

      const product = await Product.findById(item.productId);
      if (!product) return res.status(400).send('Invalid product.');

      items.push(
        {
          product: {
            _id: product._id,
            category: product.category,
            price: product.price
          },
          quantity: item.quantity
        }
      );
    }
    // const { error } = validateOrder(req.body.products[0]);
    // if (error) return res.status(400).send(error.details[0].message);



    // const product = await Product.findById(req.body.products[0].productId);
    // if (!product) return res.status(400).send('Invalid product.');

    let order = new Order(
      {
        date: req.body.date,
        total: req.body.total,
        // products: [
        //   {
        //     product: {
        //       _id: product._id,
        //       category: product.category,
        //       price: product.price
        //     },
        //     quantity: req.body.products[0].quantity
        //   }
        // ],
        products: items
      }
    );

    try {

      order = await order.save()

      res.status(201).json(
        {
          // message: 'Order was created.',
          order
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

// Update the order by orderId
router.put(
  '/:orderId',
  (req, res, next) => {
    res.status(200).json(
      {
        message: 'The order was changed.'
      }
    );
  }
);

// Delete the order By orderId
router.delete(
  '/:orderId',
  (req, res, next) => {
    res.status(200).json(
      {
        message: 'The order was deleted',
        orderId: req.params.orderId
      }
    );
  }
);





module.exports = router;
