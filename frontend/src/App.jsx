import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ProfilePage from './pages/ProfilePage';
import SignUp from './components/SignUp';
import PostHouse from './pages/PostHouse';
import SignIn from './components/SignIn';

import './App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/Sign-up" element={<SignUp />} />
              <Route pat="/post-house" element={<PostHouse />} />
              <Route path="/Sign-in" element={<SignIn />} />
            </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App

