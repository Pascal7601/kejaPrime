import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/listings" />
        <Route path="/profile" />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
      </Routes>
    </Router>
  )
}

export default App
