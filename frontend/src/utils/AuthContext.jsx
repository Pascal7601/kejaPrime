import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userType, setUserType] = useState('tenant');
  
	// this Function will assist us to login the user (to integrate it with API later)
	const login = (type) => {
	  setIsLoggedIn(true);
	  setUserType(type); // type 'landlord' or 'tenant'
	};
  
	// Function to logout the user
	const logout = () => {
	  setIsLoggedIn(false);
	  setUserType('tenant');
	};
  
	return (
	  <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
		{children}
	  </AuthContext.Provider>
	);
};