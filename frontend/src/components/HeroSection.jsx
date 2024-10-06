import React from 'react'
import '../styles/HeroSection.css';
import heroimage from '../assets/hero-image.png';

const HeroSection = () => {
  return (
	<div className='hero-section'>
		<div className='hero-content'>
			<h1> Find Most Suitable Houses</h1>
			<p>
			Find a variety of houses that suit you easily and forget about the difficulties of finding a house for you.
			</p>
		</div>
		<div className='hero-image'>
			<img src={heroimage} alt="House" />
		</div>
	</div>
  )
}

export default HeroSection
