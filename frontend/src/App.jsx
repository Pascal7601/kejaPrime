import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ProfilePage from './pages/ProfilePage';
import SignUp from './components/SignUp';
import FeedsPage from './pages/FeedsPage'
import PostHouse from './pages/PostHouse';
import SignIn from './components/SignIn';

import './App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
            <Routes>
              <Route path="/Sign-up" element={<SignUp />} />
              <Route path="/Sign-in" element={<SignIn />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/post-feed" element={<FeedsPage />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/post-house" element={<PostHouse />} />
            </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App

