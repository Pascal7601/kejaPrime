import React from 'react';
import Navbar from '../components/Navbar';
import Houses from '../components/Houses';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

const Listings = () => {
	return(
		<div>
			<Navbar />
			<Houses />
		</div>
	)

}

export default Listings;