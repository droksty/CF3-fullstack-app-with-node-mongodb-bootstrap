const User = require('../models/user.model');
const logger = require('../logger/logger');

exports.findOne = function(req, res) {
  const username = req.params.username;

  User.findOne({ username: username }, {_id: 0, username: 1, products: 1}, (err, result) => {
    if (err) {
      res.json({ status: false, data: err });
      logger.log(`Error in getting user ${username} products`, err)
    } else {
      res.json({ status: true, data: result});
    }
  })
}

exports.create = function (req, res) {
  const username = req.body.username;
  const products = req.body.products;

  User.updateOne(
    { username: username },
    { $push: {
      products: products
    }},
    (err, result) => {
      if (err) {
        res.json({status: false, data: err});
        logger.log(`Error in inserting products ${products} in user ${username}`, err)
      } else {
        res.json({status: true, data: result});
      }
    }
  )
}

// Θα μπορούσα να κάνω PUT αντί PATCH.
// Ώστε να μπορώ να αλλάζω (ή όχι) τις τιμές περισσότερων πεδίων αντί μόνο του quantity.
exports.update = function(req, res) {
  const username = req.body.username;
  const product = req.body.products.product;
  const quantity = req.body.products.quantity;

  User.updateOne(
    {
      username: username,
      'products.product': product
    },
    {
      $set: {
        'products.$.quantity' : quantity
      }
    },
    (err, result) => {
      if (err) {
        res.json({status: false, data: err});
        logger.log(`Error in updating product ${product} in user ${username}`, err)
      } else {
        res.json({status: true, data: result});
      }
    }
  )
}

exports.delete = function(req, res) {
  const username = req.params.username;
  const product = req.params.product;

  User.updateOne(
    { username: username },
    {
      $pull: {
        products: { product: product }
      }
    },
    (err, result) => {
      if (err) {
        res.json({status: false, data: err});
        logger.log(`Error in deleting product ${product} in user ${username}`, err)
      } else {
        res.json({status: true, data: result});
      }
    }
  )
}

exports.stats1 = function (req, res) {
  const username = req.params.username;
 
  User.aggregate([
    { 
      $match:{ username: username } 
    },
    {
      $unwind:"$products"
    },
    {
      $project: { _id: 1, username: 1, products: 1 }
    },
    {
      $group: { 
        _id: { 
          username: "$username", product: "$products.product" },
          totalAmount: { 
            $sum: {
              $multiply: [ "$products.cost", "$products.quantity"]
            }
          },
          count: { $sum:1 }
      }
    },
    {
      $sort:{"_id.product":1}
    }
  ],
  (err, result) => {
    if (err) {
      res.json({ status: false, data: err });
    } else {
      res.json({ status: true, data: result });
    }
  }) 
}