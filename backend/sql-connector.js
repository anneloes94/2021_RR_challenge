var mysql = require('mysql');
var process = require('process')

var connection = mysql.createConnection({
  host: "db",
  user: "user",
  password: "pass",
  database: 'db'
});

connection.connect(async (err) => {
  if (err) {
    console.log(err);
    process.exit(1); // docker-compose will run you again
                    // hopefully this time the db is ready for you
  }
  else console.log("Connected!");
});

module.exports = connection;
