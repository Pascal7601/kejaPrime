import React from 'react'
import '../styles/HeroSection.css';
import heroImg from '../assets/hero-image.png';

const HeroSection = () => {
  return (
	<section className='hero-section bg-secondary'>
		<div className='row justify-content-center align-items-center hero-content'>
			<div className='col-md-5 text-center text-md-start'>
				<h1 className='display-4 fw-bold hero-title'> Find Most Suitable Houses</h1>
				<p className='lead mt-4 hero-description'>
				Find a variety of houses that suit you easily and forget about the difficulties of finding a house for you.
				</p>
			</div>
			<div className='hero-image'>
				<img src={heroImg} alt="House" />
			</div>
		</div>
	</section>
  )
}

export default HeroSection
