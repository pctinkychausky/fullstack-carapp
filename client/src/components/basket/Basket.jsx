import React, { useContext, useEffect } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./basket.css";
import { BasketContext } from "../../contexts/basket.context";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import localForage from "localforage";

function Basket() {
  const { items, removeItem, user } = useContext(BasketContext);

  // const getURL = async () => {
  //   let getparams = new URLSearchParams(document.location.search);
  //   const showCitytest = getparams.get("city");
  //   console.log(
  //     "🚀 ~ file: Header.jsx ~ line 55 ~ Header ~ showCitytest",
  //     showCitytest
  //   );
  // };
  // getURL();

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
                <span className="booking-details-title">
                  Booking date / time:
                </span>
                <span>
                  {"  "}
                  {entry.searchParams.startDate} to {entry.searchParams.endDate}
                </span>
                {/* <div>Booking status:</div> */}
                <div>
                  <span className="booking-details-title">
                    Pick-up location:
                  </span>{" "}
                  <span>{entry.searchParams.city}</span>
                </div>
                <div>
                  <span className="booking-details-title">
                    Drop-off location:
                  </span>{" "}
                  <span>{entry.searchParams.city}</span>
                </div>
                <div>
                  <span className="booking-details-title">Lead driver:</span>{" "}
                  <span>{user.name}</span>
                </div>
                <div>
                  <span className="booking-details-title">Email:</span>{" "}
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="details-bottom">
                <div className="booking-details-title">Cancellation</div>
                <div>
                  <span className="booking-details-title">
                    Cancellation Allowed:
                  </span>{" "}
                  <span>Yes</span>
                </div>
                <div>
                  <span className="booking-details-title">
                    Cancellation Charges:
                  </span>{" "}
                  <span>No</span>
                </div>
                <div>
                  <span className="booking-details-title">Refund Amount:</span>{" "}
                  <span>£{entry.Price}</span>
                </div>
              </div>

              <div className="details-payment-status">
                <div className="booking-details-title">
                  Payment status: Un-paid
                </div>
              </div>

              <div>
                <div className="booking-details-title">
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
