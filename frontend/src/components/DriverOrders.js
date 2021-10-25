import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DriverDraggables from "./DriverDraggables";

const DriverOrders = ({ driverName, driverId, orders, getOrders }) => (
  <div className="orders">
    <Droppable droppableId={`orders-${driverId}`} type="ORDERS">
      {(provided) => (
        <>
          <h1>{driverName}</h1>
          <ul
            className="assignedOrders"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <DriverDraggables
              orders={orders[driverId]}
              getOrders={getOrders}
            />
            {provided.placeholder}
          </ul>
        </>
      )}
    </Droppable>
  </div>
);

export default DriverOrders;
