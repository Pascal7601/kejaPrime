import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios'; // Import axios to make API requests

function Dashboard() {
	//define a state to store listings fetched from API
	const[listings, setListings] = useState([]);
	const[filteredListings, setFilteredListings] = useState([]);
	const [loading, setLoading] = useState(true);

	//fetch the listings from the API whe the component mounts
	useEffect(() => {
		const fetchListings = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/v1/properties')
				setListings(response.data); //store the data in a state
				setFilteredListings(response.data); //show all listings
				console.log(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching listings, error');
				setLoading(false);
			}
		};
		fetchListings();

	}, []);
	if (loading) {
		return <div>Loading...</div>
	}
	const handleSearch = (criteria) => {
		const {location, bedrooms} = criteria;

		//filter listings based on criteria
		const filtered = listings.filter((listing) => {
			return (
				(!location || listing.location.toLowerCase().includes(location.toLowerCase())) &&
				(!bedrooms || listing.bedrooms === parseInt(bedrooms))
			);
		});
		setFilteredListings(filtered);
	}
  return (
	<div className='renters-dashboard container mt-5'>
		<h2>Renter's Dashboard</h2>
		< SearchBar onSearch={handleSearch} />

		<div className='listings mt-5'>
			<h3>Results:</h3>
			{filteredListings.length === 0 ? (
				<p>Loading listings...</p>
			) : filteredListings.length > 0 ? (
				<ul>
					{filteredListings.map((listing) => (
						<li key={listing._id}>
							{listing.location} - {listing.bedrooms} Bedrooms
						</li>
					))}
				</ul>
			) : (
				<p>No results found</p>
			)}

		</div>
	</div>
  )
}

export default Dashboard
