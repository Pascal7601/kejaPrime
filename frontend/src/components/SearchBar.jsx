import React, {useState} from 'react';
import houseSearch from "../assets/house_searching.svg";
import '../styles/SearchBar.css';

function SearchBar({onSearch}) { //accept the onSearch prop
	const[location, setLocation] = useState('');
	const[bedrooms, setBedrooms] = useState('');

	// handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log({ location, bedrooms }); // Check if criteria is being passed correctly
		onSearch({location, bedrooms}); //here you are passing search data to listings
	};

	// handle location change
	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};
	// handle bedrooms change
	const handleBedroomsChange = (event) => {
		setBedrooms(event.target.value);
	};
	return (
		<div className='search-bar'>
			<div className="contain">
				<h4>Search for Houses</h4>
				<form onSubmit= {handleSubmit} className='form-inline mb-3'>
					<div>
						<div className='form-group'>
							<label htmlFor="location">Location:</label>
							<input
								type="text"
								name='location'
								value={location}
								onChange={handleLocationChange}
								className='form-control'
								placeholder='Enter location'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor="bedrooms">Number of Bedrooms:</label>
							<input
								type="number"
								name='bedrooms'
								value={bedrooms}
								onChange={handleBedroomsChange}
								className='form-control'
								placeholder='Enter number of bedrooms'
							/>
						</div>
						<button type='submit' className='btn btn-primary w-25'>Search</button>
					</div>	
				</form>
			</div>
			<img  className='img-fluid' src={houseSearch} alt="houseSearch" />
		</div>
	);
};

export default SearchBar
