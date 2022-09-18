import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import MiddleSection from "../components/middleSection/MiddleSection";
import Navbar from "../components/narbar/Narbar";
import Newsletter from "../components/newsletter/Newsletter";
import LogBar from "../components/logBar/LogBar";

function Carhire() {
  return (
    <>
      <Navbar />
      {/* <LogBar /> */}
      <Header />
      <MiddleSection />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Carhire;
