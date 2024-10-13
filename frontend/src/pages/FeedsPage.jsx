import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { desc, image } from 'framer-motion/client';

const FeedsPage = () => {
	const [userType, setUserType] = useState('');
	const [feeds, setFeeds] = useState([]);
	const [newFeed, setNewFeed] = useState({
	  image_url: '',
	  description: '',
	  location: '',
	});
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const handleImageChange = (event) => {
		setNewFeed({ ...newFeed, image: event.target.files[0] });
	};
  
	useEffect(() => {
	  const fetchFeeds = async () => {
		try {
		  const response = await axios.get('http://localhost:8000/api/v1/feeds'); // Replace with your endpoint
		  setFeeds(response.data);
		} catch (error) {
		  console.error('Error fetching feeds:', error);
		}
	  };
  
	  const checkLoginStatus = async () => {
		try {
		  const response = await axios.get('http://localhost:8000/api/v1/users/user'); // Replace with your endpoint
		  setIsLoggedIn(true);
		} catch (error) {
		  console.error('Error checking login status:', error);
		}
	  };
  
	  fetchFeeds();
	  checkLoginStatus();
	}, []);
  
	const handleInputChange = (event) => {
	  setNewFeed({ ...newFeed, [event.target.name]: event.target.value });
	};
  
	const handleSubmit = async (event) => {
	  event.preventDefault();
	  const token = localStorage.getItem('access_token');

	  if (!token) {
		console.error('User not logged in. Please log in to create feeds.')
		return
	  }

	  try {
		const formData = new FormData();
		formData.append('image', newFeed.image);
		formData.append('description', newFeed.description);
		formData.append('location', newFeed.location);
  
		const response = await axios.post('http://localhost:8000/api/v1/feeds', formData, {
		  headers: {
			'Content-Type': 'application/json',
			'Authirization': `Bearer ${token}`,
		  },
		});
  
		setFeeds([...feeds, response.data]);
		setNewFeed({ image: '', description: '', location: '' });
	  } catch (error) {
		console.error('Error creating feed:', error);
	  }
	};
  
	return (
	  <div className="feeds-page">
		{isLoggedIn ? (
		  <div className="feed-input">
			<input type="file" onChange={handleImageChange} />
			<input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
			<input type="text" name="location" placeholder="Location" onChange={handleInputChange} />
			<button onClick={handleSubmit}>Submit</button>
		  </div>
		) : (
		  <p>Please log in to create feeds.</p>
		)}
		<div className="feed-list">
		  {feeds.length > 0 && feeds.map((feed) => (
			<div className="feed-item" key={feed.id}>
			  <img src={feed.image_url} alt="Feed Image" />
			  <p>{feed.description}</p>
			  <p>{feed.location}</p>
			</div>
		  ))}
		</div>
	  </div>
	);
};
  
  export default FeedsPage;