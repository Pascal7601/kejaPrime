import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [userType, setUserType] = useState('landlord');

	// this Function will assist us to login the urse (to integrate it with API later)
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