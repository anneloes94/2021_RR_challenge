# Backend

## Before each test
- Instantiate database with the data from data.sql

### Route `/`
- Make an axios call to /.
- Assert that it returns an HTTP statuscode of 200 (and returns "Hello! :)").

### Route `/drivers`
- Make an axios call to /drivers.
- Assert that response type is object.
- Assert that length of object is 3.

### Route `/orders`
- Same for orders. Is length of orders 10?

### Route `/orders/{id}` PATCH
- See dataset before state.
- Make a PATCH request for driver_id.
- Make a PATCH request for cost.
- Make a PATCH request for revenue.
- Make a GET call to `/orders/{id}`.
- Assert that new values are showing for this order.


# Frontend

### Assigning an order to a driver
- Drag an order from 'Unassigned Orders' to a Driver's column.
- Assert that the order remains in its dragged-to location.
- Assert that the `orders` state displays the newly assigned driver_id.
- Assert that the database has been altered by accessing the order through the backend.

### Unassigning an order to a driver
- Drag an order from a Driver's column to 'Unassigned Orders'.
- Assert that the order remains in its dragged-to location.
- Assert that the `orders` state displays null as driver_id.
- Assert that the database has been altered by accessing the order through the backend.

### Emptying a driver's column
- Empty a driver's column by dragging all orders out.
- Assert that it displays "No Orders Found".

### Emptying an Unassigned Orders column
- Empty the Unassigned Orders column by dragging all orders out.
- Assert that it displays "No Orders Found".

### Changing the cost of an order
- Click the Edit icon on an order.
- Assert that it will display editable fields, containing the order's existing values.
- Insert a different value for cost.
- Assert that it will display the new cost.
- Assert that the database has been altered by accessing the order through the backend.

### Changing the cost and revenue of an order
- Click the Edit icon on an order.
- Assert that it will display editable fields, containing the order's existing values.
- Insert a different value for cost and revenue.
- Assert that it will display the new cost and revenue.
- Assert that the database has been altered by accessing the order through the backend.

