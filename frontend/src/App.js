import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import UnassignedOrders from "./components/UnassignedOrders";
import Driver from "./components/Driver";
import OrderDetails from "./components/OrderDetail";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  // States
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  // const [driverOrders, setDriverOrders] = useState({});

  const [state, setState] = useState({
    drivers: [],
    orders: [],
  });

  const getDrivers = async () => {
    const drivers = await axios.get("/drivers");
    console.log("Setting Drivers");
    setDrivers(drivers.data);
  };

  const getOrders = async () => {
    const orders = await axios.get("/orders");

    const ords = {}; // driverId ==> [order1, order2...]
    ords["unassigned"] = [];
    orders.data.forEach((order) => {
      const driver_id = order.driver_id;
      if (!driver_id) {
        ords["unassigned"].push(order);
        return;
      }
      if (!Object.keys(ords).includes(driver_id.toString())) {
        ords[driver_id] = [];
      }
      ords[driver_id].push(order);
    });
    console.log("Setting Orders");
    setOrders(ords);
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

    await axios.patch(`/orders/${order_id}`, {
      driver_id: dst_driver_id,
    });

    getOrders(); // rerender
  }

  const GetDraggables = ({ driver_id }) =>
    orders[driver_id]
      ? orders[driver_id].map(
          ({ id, driver_id, description, cost, revenue }, index) => {
            return (
              <Draggable
                key={id.toString()}
                draggableId={id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <OrderDetails
                      description={description}
                      revenue={revenue}
                      cost={cost}
                      order_id={id}
                      getOrders={getOrders}
                    />
                  </li>
                )}
              </Draggable>
            );
          }
        )
      : [];

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Final Space Characters</h1>
      </header> */}
      <div id="content">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="orders">
            {/* create one Droppable area for unassigned orders */}
            <Droppable droppableId="orders-unassigned" type="ORDERS">
              {(provided) => (
                <>
                  <h1>Unassigned Orders</h1>
                  <ul
                    className="unassignedOrders"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <GetDraggables driver_id="unassigned" />
                    {/* {getDraggables("unassigned") ?? <p>"No Orders Available"</p>} */}
                    {provided.placeholder}
                  </ul>
                </>
              )}
            </Droppable>
          </div>
          {/* create a Droppable area for each driver */}
          {drivers.map((driver) => (
            <div className="orders">
              <Droppable droppableId={`orders-${driver.id}`} type="ORDERS">
                {(provided) => (
                  <>
                    <h1>{driver.name}</h1>
                    <ul
                      className="assignedOrders"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {/* TODO put placeholder when no orders are found "No Orders Assigned" */}
                      <GetDraggables driver_id={driver.id} />
                      {/* {getDraggables(driver.id)} */}
                      {provided.placeholder}
                    </ul>
                  </>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
