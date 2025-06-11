import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Features from "../components/Features";
import Teams from "../components/Teams";

const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Services Section */}
      <Services />

      <Teams />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;