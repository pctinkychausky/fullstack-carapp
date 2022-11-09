import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import OrdersDisplay from "../components/OrdersDisplay/OrdersDisplay";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import "./orders.css";

function Checkout() {
  return (
    <div>
      <Navbar />
      <main className="order-container">
        <div className="update-header">
          <h2>Order Summary</h2>
          <NavLink to="/">
            <Button variant="outlined" type="submit">
              Back
            </Button>
          </NavLink>
        </div>
        <OrdersDisplay />
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
