import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { desc, image } from 'framer-motion/client';

const FeedsPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [newFeed, setNewFeed] = useState({
    image: null,
    description: '',
    location: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleImageChange = (event) => {
    setNewFeed({ ...newFeed, image: event.target.files[0] });
  };

  const token = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/feeds', config);
        setFeeds(response.data);
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    fetchFeeds();
  }, []);

  const handleInputChange = (event) => {
    setNewFeed({ ...newFeed, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      console.error('User not logged in. Please log in to create feeds.');
      return;
    }

    if (!newFeed.image || !newFeed.description || !newFeed.location) {
      console.error('All fields are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', newFeed.image);
      formData.append('description', newFeed.description);
      formData.append('location', newFeed.location);

      const response = await axios.post('http://localhost:8000/api/v1/feeds', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeds([...feeds, response.data]);
      setNewFeed({ image: null, description: '', location: '' });
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
      			{feed.images.map((imageObj, index) => (
        			<img
          			key={index}
          			src={`http://localhost:8000/${imageObj.image_url}`}  // Access the image URL
          			alt={`Feed Image ${index + 1}`}
        			/>
      			))}
      			<p>{feed.description}</p>
      			<p>{feed.location}</p>
    			</div>
 				))}
			</div>
    </div>
  );
};
  
export default FeedsPage;