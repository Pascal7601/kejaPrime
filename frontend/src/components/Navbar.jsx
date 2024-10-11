import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { AuthProvider } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

function Navbar() {
	const { isLoggedIn, userType, logout } = useContext(AuthContext);
	return(
		<nav className="navbar navbar-expand-lg custom-navbar fixed-top">
			<div className='container-fluid'>
				<Link className='navbar-brand' to="/">
				<h1>Keja<span>Prime</span></h1>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bd-toggle="collapse"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className='collapse navbar-collapse' id="navbarNav">
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<Link className='nav-link' to='/'>Home</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/listings'>Listings</Link>
						</li>
						{isLoggedIn ? (
							<>
								{userType === 'landlord' && (
									<li className='nav-item'>
										<Link className='nav-link' to="/post-house">Post a House</Link>
									</li>
								)}
								<li className='nav-item'>
									<Link className='nav-link' to="/profile">Profile</Link>
								</li>
								<li className='nav-item'>
									<button className='nav-link'>Logout</button>
								</li>
							</>
						) : (
							<>
								<li className='nav-item'>
									<Link className='nav-link' to='/sign-in'>Sign In</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/sign-up'>Sign Up</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar
