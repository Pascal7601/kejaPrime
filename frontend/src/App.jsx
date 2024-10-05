import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
      <Navbar />
      <HeroSection />
      <Footer />
      <Routes>
        <Route path="/listings" />
        <Route path="/profile" />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
      </Routes>
    </Router>
  )
}

export default App
