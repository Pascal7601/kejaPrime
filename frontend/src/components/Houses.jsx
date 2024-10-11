import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Houses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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
		images: [place1, place2, place3]
	  },
	  {
		id: 2,
		title: 'Jirani Apartments',
		price: '30,000',
		location: 'Runda',
		description: 'A modern apartment with city views and state-of-the-art amenities.',
		images: [place2, place1]
	  },
	  {
		id: 3,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 4,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 5,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 6,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 7,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 8,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 9,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 10,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 11,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 12,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 13,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 14,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 15,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 16,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 17,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 18,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 19,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  },
	  {
		id: 20,
		title: 'Imenti House',
		price: '75,000',
		location: 'Westlands',
		description: 'A charming cottage in a serene countryside setting, perfect for weekend getaways.',
		images: [place3]
	  }
	  
]

function Houses() {
	const [savedHouses, setSavedHouses] = useState([]);

	const saveHouse = (houseId) => {
		setSavedHouses(prevSavedHouses => [...prevSavedHouses, houseId]);
	};

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
						<div className="house-images">
							<img
								src={house.images[0]}
								alt={`${house.title} - First Image`}
								className="house-image"
							/>
						</div>
						<h5>{house.title}</h5>
						<p className='price'>Price: {house.price}</p>
						<p className='icon-locator'>
							Location:
							<span className="location-icon">
							<FontAwesomeIcon icon={faMapMarkerAlt} />
							</span>{' '}
							{house.location}
						</p>
						<button 
							onClick={() => saveHouse(house.id)}
							className="save-button"
						>
							<FontAwesomeIcon icon={faHeart} />
						</button>
					</Link>
				))}
        	</div>
			</div>
		</>
	);
}

export default Houses;
