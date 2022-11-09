import React, { useContext, useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { CarsContext } from "../contexts/cars.context";
import { OrdersContext } from "../contexts/orders.context";
import MiddleSection from "../components/middleSection/MiddleSection";
import Navbar from "../components/narbar/Narbar";
import Newsletter from "../components/newsletter/Newsletter";

function Carhire() {
  const { loaded, fetchCars } = useContext(CarsContext);
  const { fetchOrders } = useContext(OrdersContext);

  useEffect(() => {
    if (!loaded) {
      fetchCars();
      fetchOrders();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <MiddleSection />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Carhire;
