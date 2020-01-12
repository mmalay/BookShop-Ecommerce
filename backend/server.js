const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
const bodyparser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
var app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(authRoutes);
app.use('/images', express.static('images'));

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1236',
  database: 'ecomdb',
  multipleStatements: true
});

mysqlConnection.connect(err => {
  if (!err) console.log('DB connection succeded.');
  else
    console.log(
      'DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2)
    );
});

app.listen(5000, () =>
  console.log('Express server is runnig on port no : 5000')
);

//Get all products
app.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM product', (err, rows) => {
    if (!err) res.json(rows);
    else console.log(err);
  });
});

//Get a product by incresing order of price
app.get('/lowtohigh', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM product ORDER BY price ASC',
    (err, rows) => {
      if (!err) res.json(rows);
      else console.log(err);
    }
  );
});

//Get a product by decresing order of price
app.get('/hightolow', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM product ORDER BY price DESC',
    (err, rows) => {
      if (!err) res.json(rows);
      else console.log(err);
    }
  );
});

//Get a product
app.get('/:id', (req, res) => {
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
app.get('/:g', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM product WHERE genre = ?',
    [req.params.id],
    (err, rows) => {
      if (!err) res.json(rows);
      else console.log(err);
    }
  );
});
