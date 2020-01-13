var express = require('express')
var router = express.Router()
var mysqlConnection = require('../connection');

//Get all products in shopping cart
router.route('/:id').get( (req, res) => {
    mysqlConnection.query(
      'SELECT shopping_cart.item_id, shopping_cart.quantity, product.name, product.price, product.image  FROM product INNER JOIN shopping_cart WHERE shopping_cart.product_id=product.product_id AND shopping_cart.customer_id=1;',
      (err, rows) => {
        if (!err) res.json(rows);
        else console.log(err);
      }
    );
  });

//Insert item to shopping cart
router.route('/add/').post((req, res) => {
    console.log(req.body);
    let item = req.body;
    var sql =
      'SET @customer_id = ?; SET @product_id = ?; SET @quantity = ?; \
      CALL addToCart(@customer_id,@product_id,@quantity);';
    mysqlConnection.query(
      sql,
      [item.customer_id, item.product_id, item.quantity],
      (err, rows) => {
        if (!err) {
          res.send(rows);
          console.log(rows);
        } else console.log(err);
      }
    );
  });




  //Delete an item from cart
  router.route('/delete/:id').delete((req, res) => {
    mysqlConnection.query(
      'DELETE FROM shopping_cart WHERE item_id = ?;',
      [req.params.id],
      (err, rows) => {
        if (!err) res.send('Deleted successfully.');
        else console.log(err);
      }
    );
  });
  
  //patch an item quantity in cart
  router.route('/edit/:id').put( (req, res) => {
      mysqlConnection.query(
      `UPDATE shopping_cart   SET quantity =? WHERE  item_id = ?;`,
      [req.body.value, req.params.id],
      (err, rows) => {
        if (!err) res.send('updated successfully.');
        else console.log(err);
      }
    );
  });

  module.exports = router;