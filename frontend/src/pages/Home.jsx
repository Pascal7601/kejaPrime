import React from 'react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
	  <h2> Hello</h2>
      <Footer />
    </div>
  );
};

export default Home;
