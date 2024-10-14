import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userType, setUserType] = useState('');
	const [accessToken, setAccessToken] = useState(null);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/v1/users/profile', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				if (response.status === 200) {
					setIsLoggedIn(true);
					setUserType(response.data.is_landlord);
					setAccessToken(response.data.access_token)
				}
			} catch (error) {
				console.error('Error checking authentication status:', error);
			}
		};
		checkAuthStatus();
	}, [accessToken])
  
	// this Function will assist us to login the urse (to integrate it with API later)
	const login = async (type) => {
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
		console.log('Error logging in:', error);
	  }
	};
  
	// Function to logout the user
	const logout = () => {
	  setIsLoggedIn(false);
	  setUserType('');
	  setAccessToken(null);
	};
  
	return (
	  <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
		{children}
	  </AuthContext.Provider>
	);
};