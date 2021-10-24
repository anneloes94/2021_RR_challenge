import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import UnassignedOrders from "./components/UnassignedOrders";
import Driver from "./components/Driver";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  // States
  const [orders, setOrders] = useState({});
  const [drivers, setDrivers] = useState([]);
  // const [driverOrders, setDriverOrders] = useState({});

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/orders")),
      Promise.resolve(axios.get("/drivers")),
    ])
      .then((all) => {
        setDrivers(all[1].data);
        const ords = {}; // driverId ==> [order1, order2...]
        ords['unassigned'] = [];
        const orders = all[0].data;
        orders.forEach((order) => {
          const driver_id = order.driver_id;
          if (!driver_id) {
            ords['unassigned'].push(order);
            return;
          }
          if (!Object.keys(ords).includes(driver_id.toString())) {
            ords[driver_id] = [];
          }
          ords[driver_id].push(order);
        });
        setOrders(ords);
        console.log(ords)
        console.log(ords[1])
      })
      .catch((error) => {
        console.log(
          "Could not retrieve data from the database due to the following error: ",
          error
        );
      });
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const [reorderedOrder] = orders.splice(result.source.index, 1);
    orders.splice(result.destination.index, 0, reorderedOrder);

    setOrders(orders);
  }

  const draggables = orders[1] ? orders[1].map(({ id, driver_id, description, cost, revenue }, index) => {
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
              <div className="characters-thumb">
                <p>{driver_id}</p>
              </div>
            </li>
          )}
        </Draggable>
      );
    }
  ) : []

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
      </header>
      <div id="content">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="a1">
            <Droppable droppableId="orders">
              {(provided) => (
                <ul
                  className="unassignedOrders"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {draggables}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="a3"> Driver 1 </div>
          <div className="a3"> Driver 2 </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
