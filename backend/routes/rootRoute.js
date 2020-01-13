var express = require('express')
var router = express.Router()
var mysqlConnection = require('../connection');



//Get all products
router.route('/').get( (req, res) => {
    mysqlConnection.query('SELECT * FROM product', (err, rows) => {
      if (!err) res.json(rows);
      else console.log(err);
    });
  });



//Get a product by incresing order of price
router.route('/lowtohigh').get( (req, res) => {
    mysqlConnection.query(
      'SELECT * FROM product ORDER BY price ASC',
      (err, rows) => {
        if (!err) res.json(rows);
        else console.log(err);
      }
    );
  });
  
  //Get a product by decresing order of price
  router.route('/hightolow').get( (req, res) => {
    mysqlConnection.query(
      'SELECT * FROM product ORDER BY price DESC',
      (err, rows) => {
        if (!err) res.json(rows);
        else console.log(err);
      }
    );
  });
  
  //Get a product
  router.route('/:id').get( (req, res) => {
    mysqlConnection.query(
      'SELECT * FROM product WHERE product_id = ?',
      [req.params.id],
      (err, rows) => {
        if (!err) res.json(rows);
        else console.log(err);
      }
    );
  });
  
  //Get a product by genre
  router.route('/:g').get( (req, res) => {
    mysqlConnection.query(
      'SELECT * FROM product WHERE genre = ?',
      [req.params.id],
      (err, rows) => {
        if (!err) res.json(rows);
        else console.log(err);
      }
    );
  });  

module.exports = router;