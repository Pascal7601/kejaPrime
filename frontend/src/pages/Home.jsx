import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegCheckCircle } from "react-icons/fa";
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import location from '../assets/location.svg';
import guy from '../assets/buy-house.svg';
import '../styles/HomePage.css';

const Home = () => {
  return (
    <div>
		<div className="navigation">
			<HeroSection />
			<Navbar />
		</div>
		<div className="body-home">
			<section className="section-1">
				<h2>About Us</h2>
				<div className="about-us">
					<p>
						At KejaPrime, our goal is to make finding rental properties
						seamless and hassle-free. We connect renters with the best 
						housing options that match their preferences and budget, 
						ensuring a smooth and reliable experience.Don't let the hassle
						of finding a house get into the way of living a life you deserve.
						With just a tap of a button you get to connect with renters and 
						realtors without the need of getting through agents and brokers.
					</p>
					<img  className='img-fluid' src={location} alt="phone-locating" />
				</div>
				
				<h2>Our Goals</h2>
				<h4>Helping You Find Your Dream Home</h4>
				<div className="goals">
					<div className="list">
						<ul>
							<li>Provide a wide variety of rental houses</li>
							<li>Offer properties in prime locations</li>
							<li>Ensure quick and easy house-finding process</li>
							<li>Provide a wide variety of rental houses</li>
							<li>Provide a wide variety of rental houses</li>

						</ul>
					</div>

					<img  className='img-fluid' src={guy} alt="phone-locating" />
				</div>
			</section>
		</div>
      
      <Footer />
    </div>
  );
};

export default Home;
