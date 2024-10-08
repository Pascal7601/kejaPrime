import React from 'react'
import '../styles/HeroSection.css';
import heroImg from '../assets/hero-image.png';

const HeroSection = () => {
  return (
	<section className='hero-section bg-dark mt-5'>
		<div className='container-lg'>
			<div className='row justify-content-center align-items-center hero-content'>
				<div className='col-md-5 text-center text-md-start'>
					<div className='hero-title'>
						<h1 className='display-4 text-white fw-bold hero-title'> Find Most <br /> 	Suitable Houses</h1>
					</div>
					<div className='hero-description'>
						<p className='lead mt-4 text-white'>
						Find a variety of houses that suit you easily and forget about the difficulties of finding a house for you.
						</p>
					</div>
				</div>
				<div className='col-md-5 text-center hero-image d-none d-md-block img-container'>
					<img className='img-fluid' src={heroImg} alt="House" />
				</div>
			</div>
		</div>
	</section>
  )
}

export default HeroSection
