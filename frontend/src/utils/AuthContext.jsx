import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      checkAuthStatus();
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  const checkAuthStatus = async () => {
    if (!accessToken) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserType(response.data.is_landlord);
      } else {
        console.log('User not logged');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsLoggedIn(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/sign_in', { email, password });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserType(response.data.is_landlord);
        setAccessToken(response.data.access_token);
      } else {
        console.error("Error logging in:", response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setAccessToken(null);
    localStorage.removeItem('accessToken'); // Remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
