import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import CarList from "./Cars/CarList";
import CarForm from "./Cars/CarForm";
import { red } from "@mui/material/colors";

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
        <CarForm />
      </div>
      <Footer />
    </>
  );
}

export default Admin;
