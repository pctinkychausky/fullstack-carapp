import React, { useContext, useEffect } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./ordersDisplay.css";
import { OrdersContext } from "../../contexts/orders.context";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import localForage from "localforage";
// import { formatPrice } from "./../../utils/utils";

function OrdersDisplay() {
  const { orders, loaded, fetchOrders, loading, error } =
    useContext(OrdersContext);

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
      {orders.map(({ _id, items = [] }) => (
        <li key={_id}>
          <h2>Order ID: {_id}</h2>
          <ul className="order-list">
            {items.map(({ title, price, _id }) => (
              <li key={_id}>
                {/* {title} ({formatPrice(price)}) */}
                {title} ({price})
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default OrdersDisplay;
