import React from "react";
import Hero from "../landing/Hero";
import Footer from "../landing/Footer";
import Navbar from "../components/Navbar";
import Service from "../landing/Services";
import Partners from "../landing/Partners";
import Events from "../landing/Events";
import Charity from "../landing/Charity";
import Donate from "../landing/Donate";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Service />
      <Partners />
      <Charity />
      <Donate />
      <Events />
      <Footer />
    </div>
  );
};

export default Home;
