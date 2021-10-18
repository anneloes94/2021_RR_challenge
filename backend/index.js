const express = require('express')
const app = express()
const port = 3000

const connection = require('./sql-connector');

app.get('/', async (req, res) => {
  connection.query('SELECT * FROM orders;', function (error, results, fields) {
    res.send(results);
  });
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

app.put('/orders/:order_id/edit', (req, res) => {
  const order_id = req.params.order_id;
  if(order_id && !Number(order_id)) {
    res.statusMessage = "Order id is not a number";
    res.status(400).end();
  }
  let driver_id = req.body.params['driver_id']
  // TODO add driver_id validation
  connection.query(`UPDATE orders SET driver_id = ${driver_id} WHERE order_id = ${order_id};`, function (error, results, fields) {
    res.send(results);
  });
  // TODO: enable modifying cost/revenue
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})