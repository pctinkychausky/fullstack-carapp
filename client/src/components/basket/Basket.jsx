import React, { useContext, useEffect } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./basket.css";
import { BasketContext } from "../../contexts/basket.context";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import localForage from "localforage";

function Basket() {
  const { items, removeItem, reset, user } = useContext(BasketContext);

  const product = items.map((entry) => {
    console.log("🚀 ~ file: Basket.jsx ~ line 10 ~ product ~ entry", entry);
    return (
      <div>
        <div className="cart-container">
          <div className="booking-title">
            <div>
              <span>
                <PendingActionsIcon />
              </span>
              {/* <span>Booking Summary</span> */}
              <span>Booking Details</span>
            </div>
            <IconButton
              aria-label="delete"
              onClick={() => removeItem(entry._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className="details-container">
            <div className="booking-details">
              <div className="details-top">
                {/* <div>Booking reference:</div>
                <div>Collection reference:</div> */}
                <div>Booking date / time:</div>
                {/* <div>Booking status:</div> */}
                <div>
                  <span>Pick-up location:</span> <span></span>
                </div>
                <div>
                  <span>Drop-off location:</span> <span></span>
                </div>
                <div>
                  <span>Lead driver:</span> <span>{user.name}</span>
                </div>
                <div>
                  <span>Email:</span> <span>{user.email}</span>
                </div>
              </div>
              <div className="details-bottom">
                <div>Cancellation</div>
                <div>
                  <span>Cancellation Allowed:</span> <span>Yes</span>
                </div>
                <div>
                  <span>Cancellation Charges:</span> <span>No</span>
                </div>
                <div>
                  <span>Refund Amount:</span> <span>£{entry.Price}</span>
                </div>
              </div>

              <div className="details-payment-status">
                <div>Payment status: Un-paid</div>
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
      </div>
    );
  });

  return (
    <>
      <div>{product}</div>
    </>
  );
}

export default Basket;
