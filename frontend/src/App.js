import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import DriverOrders from "./components/DriverOrders";

function App() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    const drivers = await axios.get("/drivers");
    setDrivers(drivers.data);
  };

  const getOrders = async () => {
    const orders = await axios.get("/orders");

    const driverOrderMap = {}; // driverId ==> [order1, order2...]
    driverOrderMap["unassigned"] = [];
    orders.data.forEach((order) => {
      const driver_id = order.driver_id;
      if (!driver_id) driverOrderMap["unassigned"].push(order);
      else {
        if (!Object.keys(driverOrderMap).includes(driver_id.toString())) {
          driverOrderMap[driver_id] = [];
        }
        driverOrderMap[driver_id].push(order);
      }
    });
    setOrders(driverOrderMap);
  };

  useEffect(() => {
    try {
      getDrivers();
      getOrders();
    } catch (error) {
      console.log(
        "Could not retrieve data from the database due to the following error: ",
        error
      );
    }
  }, []);

  // Handles a drag-and-drop action
  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const src_driver_id = result.source.droppableId.split("-")[1];
    let dst_driver_id = result.destination.droppableId.split("-")[1];
    const order_id = orders[src_driver_id][result.source.index].id; // TODO: check if this is a stable solution

    if (dst_driver_id === "unassigned") dst_driver_id = null;

    try {
      await axios.patch(`/orders/${order_id}`, {
        driver_id: dst_driver_id,
      });
    } catch (error) {
      console.log(
        "Could not retrieve data from the database due to the following error: ",
        error
      );
    }
    getOrders(); // rerender
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Orders Overview </h1>
      </header>
      <div id="content">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <DriverOrders
              driverName={'Unassigned Orders'}
              driverId={'unassigned'}
              orders={orders}
              getOrders={getOrders}
            />
          {drivers.map((driver) => (
            <DriverOrders
              driverName={driver.name}
              driverId={driver.id}
              orders={orders}
              getOrders={getOrders}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
