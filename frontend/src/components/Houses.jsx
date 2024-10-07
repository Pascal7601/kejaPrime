import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Houses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import place1 from '../assets/place1.jpeg';
import place2 from '../assets/place2.jpeg';
import place3 from '../assets/place3.jpeg';

export const housesData = [
	{
		id: 1,
		title: 'Olympus Suites',
		price: '25,000',
		location: 'Kasarani',
		description: 'A beautiful apartment with 2 bedrooms, 4 bathrooms, and a private pool.',
		image: place1
	  },
	  {
		id: 2,
		title: 'Jirani Apartments',
		price: '30,000',
		location: 'Runda',
		description: 'A modern apartment with city views and state-of-the-art amenities.',
		image: place2
	  },
	  {
		id: 3,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		image: place3
	  }
]

function Houses() {
	return (
		<>
		
			<div className="houses-container">
			<div className="house-row">
				{housesData.map((house) => (
					<Link
					to={`/houses/${house.id}`}
					key={house.id}
					className="house-card"
					>
					<img src={house.image} alt={house.title} className="house-image" />
					<h4>{house.title}</h4>
					<p>Price: {house.price}</p>
					<p>
						Location
						<span className="location-icon">
						<FontAwesomeIcon icon={faMapMarkerAlt} />
						</span>{' '}
						{house.location}
					</p>
					<p>{house.description}</p>
					</Link>
				))}
        </div>
			</div>
		</>
	);
}

export default Houses;
