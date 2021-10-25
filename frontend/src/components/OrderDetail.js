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
      <i className="fas fa-grip-lines"></i>
      <p>{description}</p>
      {isEdit ? (
        <input id="inputRev" defaultValue={revenue} />
      ) : (
        <p> ${revenue} </p>
      )}
      {isEdit ? <input id="inputCost" defaultValue={cost} /> : <p> ${cost} </p>}
      <i
        className={isEdit ? "fas fa-save" : "fas fa-edit"}
        onClick={editSaveDetail}
      ></i>
    </div>
  );
};

export default OrderDetails;
