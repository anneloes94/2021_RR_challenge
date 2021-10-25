import React from "react";
import { Draggable } from "react-beautiful-dnd";
import OrderDetails from "./OrderDetail";

const DriverDraggables = ({ orders, getOrders }) => {
  if (!orders || orders.length === 0) {
    return <p> No Orders Found </p>;
  }
  return orders.map(({ id, description, cost, revenue }, index) => {
    return (
      <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
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
  });
};

export default DriverDraggables;
