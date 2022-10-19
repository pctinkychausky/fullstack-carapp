import React, { useContext, useEffect } from "react";
import { CarsContext } from "../contexts/cars.context";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import Basket from "../components/basket/Basket";
import { useParams } from "react-router-dom";
import CarForm from "./Cars/CarForm";
import Button from "@mui/material/Button";
import "./updatecar.css";
import { NavLink } from "react-router-dom";

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
      <main>
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
