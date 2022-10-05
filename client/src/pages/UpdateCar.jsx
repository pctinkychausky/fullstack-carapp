import React, { useContext, useEffect } from "react";
import { CarsContext } from "../components/context/cars.Context";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import { useParams } from "react-router-dom";
import CarForm from "./Cars/CarForm";

function UpdateProducts() {
  let { id } = useParams();
  console.log("🚀 ~ file: UpdateCar.jsx ~ line 10 ~ UpdateProducts ~ id", id);
  const { cars, loaded, fetchCars } = useContext(CarsContext);
  console.log("cars", cars);

  // useEffect(() => {
  //   console.log("in useEffect", cars, loaded);
  //   if (!loaded) {
  //     fetchCars();
  //   }
  // }, [loaded, fetchCars, cars]);

  console.log("cars", cars);
  const productToBeUpdated = cars.find((product) => product._id === id);
  console.log("productToBeUpdated", productToBeUpdated);
  return (
    <div className="App">
      <Navbar />
      <main>
        <h2>Update Cars</h2>
        <CarForm initialValues={productToBeUpdated} />
      </main>
      <Footer />
    </div>
  );
}

export default UpdateProducts;
