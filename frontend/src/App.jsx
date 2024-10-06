import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Houses from './components/Houses';
import HouseDetails from './components/HouseDetails';
import './App.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/listings" element={<Houses />} />
        <Route path="/houses/:id" element={<HouseDetails />} />
        <Route path="/profile" />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
      </Routes>
    </Router>
  );
}

export default App
