const express = require('express');
var cors = require('cors');
const bodyparser = require('body-parser');
const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');
const ordersRoute = require('./routes/ordersRoute');
const rootRoute = require('./routes/rootRoute');
var mysqlConnection = require('./connection');

var app = express();

app.use(bodyparser.json());
app.use(cors());
app.use('/images', express.static('images'));

app.use(authRoute);
app.use('/',rootRoute);
app.use('/cart',cartRoute);
app.use('/orders',ordersRoute);

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