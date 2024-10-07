import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Houses from './components/Houses';
import HeroSection from './components/HeroSection';
import HouseDetails from './components/HouseDetails';
import './App.css';
import Footer from './components/Footer';

function App() {
  
  return (
    <Router>
      <Navbar />
      <HeroSection />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/listings" element={<Houses />} />
        <Route path="/houses/:id" element={<HouseDetails />} />
        <Route path="/profile" />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App

