var express = require('express');
var router = express.Router();
var mysqlConnection = require('../connection');

//Get all orders
router.route('/:id').get((req, res) => {
  mysqlConnection.query(
    'SELECT orders.order_id, orders.created_on, orders.quantity, product.name, product.price, product.image, product.product_id  FROM product INNER JOIN orders WHERE orders.product_id=product.product_id AND orders.customer_id=1;',
    (err, rows) => {
      if (!err) res.json(rows);
      else console.log(err);
    }
  );
});

//Insert item to order
router.route('/add').post((req, res) => {
  let item = req.body;
  var sql =
    'SET @created_on= ?; SET @customer_id = ?; SET @product_id = ?; SET @quantity = ?; \
      CALL addToOrders(@created_on,@customer_id,@product_id,@quantity);';
  mysqlConnection.query(
    sql,
    [item.created_on, item.customer_id, item.product_id, item.quantity],
    (err, rows) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else console.log(err);
    }
  );
});

module.exports = router;
