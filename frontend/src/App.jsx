import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Listings from './pages/Listings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/Sign-up" element={<SignUp />} />
          <Route path="/Sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

