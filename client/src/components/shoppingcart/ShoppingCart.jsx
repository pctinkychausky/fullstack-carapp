import React from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import "./shoppingcart.css";
import { ShoppingCartContext } from "./../../contexts/shoppingCart.context";

function ShoppingCart() {
  const { items, removeItem, reset } = useContext(ShoppingCartContext);
  if (items.length === 0) {
    return <p>No products to display</p>;
  }
  return (
    <>
      {item.map((entry) => (
        <React.Fragment key={nanoid()}>
          <div className="CarListContainer">
            <header className="header-bar LeagueSpartan">
              <h3 className="car-name">
                {entry.Make}
                <span> </span>
                {entry.Model}
                <span className="ClearSans">{"      \u00A0"} or similar</span>
              </h3>
              <span className="logo-bar">
                <div className="header-bar-logo1">
                  <div className="rating">Customer rating:</div>
                  <div className="star">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
                <div className="header-bar-logo2">
                  <img
                    src="https://www.zestcarrental.com/images/supplier-logos/dollar.1603980200.gif"
                    alt=""
                    id="dollar-logo"
                  />
                </div>
              </span>
            </header>
            <div id="carImage">
              <img id="image" src={entry.ImageUrl} alt="" />
            </div>
            <div id="sidebar-top" className=" LeagueSpartan">
              £{entry.Price}
            </div>
            <div id="sidebar-bottom">
              <div className="button-container">
                <button
                  className="booking-email LeagueSpartan"
                  style={{ color: "white" }}
                >
                  Email
                </button>
                <button
                  className="booking-click LeagueSpartan"
                  style={{ color: "#2d294b" }}
                  onClick={() => addItem(product)}
                >
                  Next Step
                </button>
              </div>
            </div>
            <div id="policy1" className="LeagueSpartan policy">
              <h6>Fair fuel policy</h6>
              <p className="ClearSans">Return with same amount</p>
            </div>
            <div id="policy2" className="LeagueSpartan policy">
              <h6>Collection info</h6>
              <p className="ClearSans">Off-site</p>
            </div>
            <div id="policy3" className="LeagueSpartan policy">
              <h6>Refundable security deposit</h6>
              <p className="ClearSans">£1,205.00</p>
            </div>
            <div id="policy4" className="LeagueSpartan policy">
              <h6>Mandatory local charges</h6>
              <p className="ClearSans">No mandatory local charges</p>
            </div>
            <div id="extra">
              <h6 className=" LeagueSpartan">Only with Rental.com...</h6>
              <ul className="ClearSans OnlyWithZest-top">
                <li className="OnlyWithZest">
                  {" "}
                  <span>
                    <CheckCircleOutlineIcon />
                  </span>
                  {"  \u00A0"}
                  Full Collision Damage Waiver with Excess Protection
                </li>

                <li className="OnlyWithZest">
                  <CheckCircleOutlineIcon />
                  {"  \u00A0"}
                  Free cancellation
                </li>
                <li className="OnlyWithZest">
                  <CheckCircleOutlineIcon />
                  {"  \u00A0"}
                  One free additional driver
                </li>
                <li className="OnlyWithZest">
                  <CheckCircleOutlineIcon />
                  {"  \u00A0"}
                  Breakdown assistance
                </li>
                <li className="OnlyWithZest">
                  <CheckCircleOutlineIcon />
                  {"  \u00A0"}
                  Enhanced Cleaning
                </li>
              </ul>
            </div>
          </div>
        </React.Fragment>
        // <div className="cart-container">
        //   <div className="booking-title">
        //     <span>
        //       <PendingActionsIcon />
        //     </span>
        //     <span>Booking Summary</span>
        //   </div>
        //   <div className="summary-container">
        //     <div className="booking-summary">
        //       <div className="summary-top">
        //         <div>Booking reference:</div>
        //         <div>Collection reference:</div>
        //         <div>Booking date / time:</div>
        //         <div>Booking status:</div>
        //         <div>Pick-up location:</div>
        //         <div>Drop-off location:</div>
        //         <div>Lead driver:</div>
        //         <div>Email:</div>
        //         <div>Phone:</div>
        //       </div>
        //       <div className="summary-bottom">
        //         <div>Cancellation</div>
        //         <div>Cancellation Allowed:</div>
        //         <div>Cancellation Charges:</div>
        //         <div>Refund Amount:</div>
        //       </div>
        //       <div>
        //         <div>
        //           This booking cannot be cancelled as it is less than 48 hours
        //           before collection
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      ))}
    </>
  );
}

export default ShoppingCart;
