import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
// import ProductList from "../components/productlist/ProductList";
import CarList from "../components/carlist/CarList";

function Carhire() {
  return (
    <>
      <Navbar />
      {/* <ProductList /> */}
      <CarList />
      <Footer />
    </>
  );
}

export default Carhire;
