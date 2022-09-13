import React from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./shoppingcart.css";

function ShoppingCart() {
  return (
    <div className="cart-container">
      <div className="booking-title">
        <span>
          <PendingActionsIcon />
        </span>
        <span>Booking Summary</span>
      </div>
      <div className="summary-container">
        <div className="booking-summary">
          <div className="summary-top">
            <div>Booking reference:</div>
            <div>Collection reference:</div>
            <div>Booking date / time:</div>
            <div>Booking status:</div>
            <div>Pick-up location:</div>
            <div>Drop-off location:</div>
            <div>Lead driver:</div>
            <div>Email:</div>
            <div>Phone:</div>
          </div>
          <div className="summary-bottom">
            <div>Cancellation</div>
            <div>Cancellation Allowed:</div>
            <div>Cancellation Charges:</div>
            <div>Refund Amount:</div>
          </div>
          <div>
            <div>
              This booking cannot be cancelled as it is less than 48 hours
              before collection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
