import React, { useState} from 'react';
import Navbar from '../components/Navbar';
import Houses, { housesData } from '../components/Houses';
import SearchBar from '../components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

const Listings = () => {
	const[filteredHouses, setFilteredHouses] = useState(housesData);

	const handleSearch = (searchQuery) => {
		const filtered = housesData.filter((house) =>
			house.location.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredHouses(filtered); // Update filteredHouses based on location
	};

	return(
		<div>
			<Navbar />
			<SearchBar onSearch={handleSearch} /> {/* display search bar */}
			<div className='listing-container'>
				{filteredHouses.length > 0 ? (
					filteredHouses.map((house) => {
						<Houses key={house.id} house={house} />
					})
				) : (
					<p>No houses found for the selected location.</p>
				)}
			</div>
		</div>
	);

};

export default Listings;