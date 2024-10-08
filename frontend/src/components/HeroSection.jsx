import React from 'react'
import '../styles/HeroSection.css';
import heroImg from '../assets/hero-image.png';
import {HiLocationMarker} from 'react-icons/hi';

const HeroSection = () => {
  return (
	<section className='hero-section text-white bg-dark mt-5'>
		<div className='container-lg'>
			<div className='row justify-content-center align-items-center hero-content'>
				<div className='col-md-5 text-center text-md-start'>
					<div className='hero-title'>
						<h1 className='display-4 fw-bold hero-title'> Find Most <br /> 	Suitable Houses</h1>
					</div>
					<div className='hero-description'>
						<p className='lead mt-4'>
						Find a variety of houses that suit you easily and forget about the difficulties of finding a house for you.
						</p>
					</div>
					<div className='search-bar'>
						<HiLocationMarker className='text-primary' />
						<input type="text" />
						<button type="button" className='btn btn-primary w-25'>Search </button>

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
