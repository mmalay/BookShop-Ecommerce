var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1236',
  database: 'ecomdb',
  multipleStatements: true
});

module.exports = mysqlConnection;
