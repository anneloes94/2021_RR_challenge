const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require('./sql-connector');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());
// app.use(express.static("public"));

app.get('/', async (req, res) => {
  res.send("Hello! :)");
});

app.get('/drivers', (req, res) => {
  connection.query('SELECT * FROM drivers;', function (error, results, fields) {
    res.send(results);
  });
});

app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM orders;', function (error, results, fields) {
    res.send(results);
  });
});

app.patch('/orders/:order_id', (req, res) => {
  const order_id = req.params.order_id;
  const body = req.body;
  if(!body) res.status(500).json({ error: error.message })
  
  //TODO: throw error if its not a number or null

  if('driver_id' in body) {
    connection.query("UPDATE orders SET driver_id = ? WHERE id = ?;", [
      body.driver_id, order_id,
    ], function (error, results, fields) {
      res.send(results);
    });
  }

  if('cost' in body) {
    connection.query("UPDATE orders SET cost = ? WHERE id = ?;", [
      body.cost, order_id,
    ], function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: error.message })
      } else {
        res.send(results);
      }
    });
  }

  if('revenue' in body) {
    connection.query("UPDATE orders SET revenue = ? WHERE id = ?;", [
      body.revenue, order_id,
    ], function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: error.message })
      } else{
        res.send(results);

      }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})