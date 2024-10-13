 import React, {useState} from 'react';

 function SearchBar({onSearch}) { //accept the onSearch prop
	const [searchQuery, setSearchQuery] = useState('');

	// handle input change
 	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
 	};
	const handleSubmit = (event) => {
		event.preventDefault();
		onSearch(searchQuery);
	};

 	return (
 		<div className='search-bar'>
			<h2 className='text-center'> Search for Houses</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group mb-3'>
					<input
 						type="text"
 						value={searchQuery}
 						onChange={handleInputChange}
 						className='form-control'
 						placeholder=' Search houses here by location'
 					/>
				</div>
				<button type='submit' className='btn btn-primary w-25'>Search</button>

			</form>
 	</div>

 	);
 };

 export default SearchBar
