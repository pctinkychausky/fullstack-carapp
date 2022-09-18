import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import ProfileElement from "../components/profileElement/ProfileElement.jsx";

function Profile() {
  return (
    <>
      <Navbar />
      <ProfileElement />
      <Footer />
    </>
  );
}

export default Profile;
