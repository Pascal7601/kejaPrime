//  //import React, {useContext, useState} from 'react';
// import { AuthContext } from '../utils/AuthContext';
// import Navbar from '../components/Navbar';
// import Houses from '../components/Houses';
// import SearchBar from '../components/SearchBar';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/Footer.css';

// const Listings = () => {
// 	const{isLoggedIn, userType} = useContext(AuthContext);
// 	const[filteredHouses, setFilteredHouses] = useState([]);

// 	const handleSearch = async ({ location, bedrooms }) => {
// 		try {
// 			const response = await axios.get('http://localhost:8000/api/v1/properties/property', {
// 				params: { location, bedrooms },
// 			});
// 			setFilteredHouses(response.data); // Set filtered houses from API response
// 		} catch (error) {
// 			console.error('Error fetching filtered houses:', error);
// 		}
// 	};

// 	return(
// 		<div>
// 			<Navbar />
// 			<SearchBar onSearch={handleSearch} /> {/* display search bar */}
// 			<Houses houses={filteredHouses} userType={userType} isLoggedIn={isLoggedIn} />
// 		</div>
// 	);

// };

// export default Listings;