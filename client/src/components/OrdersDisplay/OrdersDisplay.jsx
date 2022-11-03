import React, { useContext, useEffect } from "react";
import "./ordersDisplay.css";
import { OrdersContext } from "../../contexts/orders.context";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../loading/Loading";

// import { formatPrice } from "./../../utils/utils";

function OrdersDisplay() {
  const {
    orders,
    loaded,
    fetchOrders,
    loading,
    error,
    addOrder,
    updateOrder,
    deleteOrder,
  } = useContext(OrdersContext);

  // console.log("orders", orders);

  useEffect(() => {
    console.log("in useEffect", orders, loaded, loading);
    // debugger;
    if (!loading && !loaded) {
      fetchOrders();
    }
  }, [loaded, fetchOrders, orders, loading]);

  if (orders.length === 0) {
    return <p>No orders to display</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {orders.map(({ _id, items = [], customerID, updatedAt }) => (
        <li key={_id} className="order-row">
          <div>Order ID: {_id}</div>{" "}
          <div>
            Price:
            {items.map(({ title, Price, _id }) => (
              <span>${Price}</span>
            ))}
          </div>
          <div>Customer ID: {customerID}</div>
          <div>Date: {new Date(updatedAt).toLocaleString("en-GB")}</div>
          <IconButton aria-label="delete" onClick={() => deleteOrder(_id)}>
            <DeleteIcon />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}

export default OrdersDisplay;
