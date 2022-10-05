import React, { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import CarList from "./Cars/CarList";
import CarForm from "./Cars/CarForm";

function Admin() {
  const style = {
    display: "flex",
    justifyContent: "space-evenly",
  };
  return (
    <>
      <Navbar />
      <h1 style={{ marginTop: 40 }}>Invetory List</h1>
      <div className="table-container" style={style}>
        <CarList />
        <div>
          <h2>Add Car</h2>
          <CarForm />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
