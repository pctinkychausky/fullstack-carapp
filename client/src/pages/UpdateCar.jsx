import React, { useContext, useEffect } from "react";
import { CarsContext } from "../contexts/cars.context";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import { useParams } from "react-router-dom";
import CarForm from "./Cars/CarForm";
import Button from "@mui/material/Button";
import "./updatecar.css";
import { NavLink } from "react-router-dom";
import Loading from "../components/loading/Loading";

function UpdateProducts() {
  let { id } = useParams();

  const { cars, loaded, fetchCars } = useContext(CarsContext);

  useEffect(() => {
    console.log("in useEffect", cars, loaded);
    if (!loaded) {
      fetchCars();
    }
  }, [loaded, fetchCars, cars]);

  const productToBeUpdated = cars.find((product) => product._id === id);
  console.log("productToBeUpdated1", productToBeUpdated);
  return (
    <div className="App">
      <Navbar />
      <main>
        <div className="update-header">
          <h2>Update Cars</h2>
          {!loaded ? (
            <Loading />
          ) : (
            <NavLink to="/admin">
              <Button variant="outlined" type="submit">
                Back
              </Button>{" "}
            </NavLink>
          )}
        </div>

        <CarForm initialValues={productToBeUpdated} />
      </main>
      <Footer />
    </div>
  );
}

export default UpdateProducts;
