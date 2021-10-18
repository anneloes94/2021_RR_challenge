var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "db",
  user: "user",
  password: "pass",
  database: 'db'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;