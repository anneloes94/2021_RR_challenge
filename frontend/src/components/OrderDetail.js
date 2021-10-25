import React, { useState } from "react";
import axios from "axios";

const OrderDetails = ({ description, revenue, cost, order_id, getOrders }) => {
  const [isEdit, setIsEdit] = useState(false);

  const editSaveDetail = async (result) => {
    const inputRev = document.getElementById("inputRev")?.value;
    const inputCost = document.getElementById("inputCost")?.value;
    if (isEdit) {
      // TODO do not call backend if values are the same as before
      try {
        await axios.patch(`/orders/${order_id}`, {
          cost: inputCost,
        });
        await axios.patch(`/orders/${order_id}`, {
          revenue: inputRev,
        });
      } catch (error) {
        console.log(
          "Could not save data to the database due to the following error: ",
          error
        );
      }
      getOrders(); // rerender
    }
    setIsEdit(!isEdit);
  };

  return (
    <div className="draggable-items">
      <i className="fas fa-grip-lines dr-item"></i>
      <p className="dr-item">{description}</p>
      ${isEdit ? (
        <input className="dr-item revenue" id="inputRev" defaultValue={revenue} />
      ) : (
        <p className="dr-item revenue"> {revenue} </p>
      )}
      ${isEdit ? <input className="dr-item cost" id="inputCost" defaultValue={cost} /> : <p className="dr-item cost"> {cost} </p>}
      <i
        className={isEdit ? "dr-item fas fa-save" : "dr-item fas fa-edit"}
        onClick={editSaveDetail}
      ></i>
    </div>
  );
};

export default OrderDetails;
