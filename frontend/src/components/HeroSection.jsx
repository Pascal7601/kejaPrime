import React from 'react'
import '../styles/HeroSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroimage from '../assets/hero-image.png'

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
			<div className='col-md-5 hero-image'>
			<img src={heroimage} alt="House" className='img-fluid d-none d-md-block'/>
			</div>
		</div>
	</section>
  )
}

export default HeroSection
