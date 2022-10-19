import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import Basket from "../components/basket/Basket";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import "./checkout.css";

function Checkout() {
  // let { id } = useParams();

  // const { cars, loaded, fetchCars } = useContext(CarsContext);

  // useEffect(() => {
  //   console.log("in useEffect", cars, loaded);
  //   if (!loaded) {
  //     fetchCars();
  //   }
  // }, [loaded, fetchCars, cars]);

  // const productToBeUpdated = cars.find((product) => product._id === id);
  // console.log("productToBeUpdated1", productToBeUpdated);
  return (
    <div className="App">
      <Navbar />
      <main className="checkout-container">
        <div className="update-header">
          <h2>Checkout Basket</h2>
          <NavLink to="/carhire">
            <Button variant="outlined" type="submit">
              Back
            </Button>
          </NavLink>
        </div>
        <Basket />
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
