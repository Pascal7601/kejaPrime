import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';
import { AuthContext } from '../utils/AuthContext';
import appartment from '../assets/appartment.svg';
import 'bootstrap/dist/css/bootstrap.min.css';


const HeroSection = () => {
	const { isLoggedIn, userType } = useContext(AuthContext);	

	return (
		<section className='hero-section'>
			<div className='container-lg'>
				<div className='row justify-content-center align-items-center hero-content'>
					<div className='col-md-7 text-center text-md-start'>
						<div className='hero-title'>
							<h1 className='display-4 fw-bold hero-title'> Find <span>Most</span> <br /> 	Suitable Houses</h1>
						</div>
						<div className='hero-description'>
							<p className='lead mt-4 mb-sm-3'>
							Find a variety of houses that suit you easily and forget about the difficulties of finding a house for you.
							</p>
							{isLoggedIn ? (
								userType === 'true' ? (
									<Link to="/home" className="call-to mb-4 mb-sm-3 mb-md-4 mb-lg-5">
										Landlord Dashboard
									</Link>
								) : (
									<Link to="/home" className="bubble">
										Tenant Dashboard
									</Link>
								)
							) : (
								<Link to="/sign-in" className="call-to mb-4 mb-sm-3 mb-md-4 mb-lg-5">
									Get Started
								</Link>
							)}
						</div>
					</div>
					<div className='col-md-5 
					text-center hero-image d-none d-md-block img-container'>
						<img className='img-fluid' src={appartment} alt="House" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
