import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
	const isloggedIn = false;

	return(
		<nav>
			<h1>Keja<span>Prime</span></h1>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/listings">Listings</Link></li>
				{isloggedIn ? (
					<>
						<li><Link to="/profile">Profile</Link></li>
						<li><button>Log Out</button></li>
					</>
				) : (
					<>
						<li><Link to="/sign-in">Sign In</Link></li>
						<li><Link to="/sign-up">Sign Up</Link></li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navbar