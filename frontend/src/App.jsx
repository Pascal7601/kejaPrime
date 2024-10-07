import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Houses from './components/Houses';
import HeroSection from './components/HeroSection';
import HouseDetails from './components/HouseDetails';
import './App.css';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App

