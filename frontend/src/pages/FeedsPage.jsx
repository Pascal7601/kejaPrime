import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import "../styles/FeedsPage.css";
import axios from 'axios';

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

  const handleBookmark = async (feedId) => {
    if (!token) {
      console.error('User not logged in. Please log in to bookmark a feed.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/bookmarks/feeds/${feedId}`,
        {},
        config
      );

      if (response.status === 200) {
        console.log('Feed bookmarked successfully');
      }
    } catch (error) {
      console.error('Error bookmarking feed:', error);
    }
  };

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
          'Content-Type': 'multipart/form-data',
        },
      });

      setFeeds([...feeds, response.data]);
      setNewFeed({ image: null, description: '', location: '' });
    } catch (error) {
      console.error('Error creating feed:', error);
    }
  };

  return (
    <div className="container-fluid feeds-page">
      <Navbar />
      <div className="row">
        <div className=" right-side col-md-9 col-lg-10 order-2 order-sm-1">
          <div className="crud d-flex flex-column">
            {feeds.length > 0 ? (
              feeds.map((feed) => (
                <div className="feed-item mb-4" key={feed.id}>
                  <div className="feed-images d-flex justify-content-center mb-3">
                    {Array.isArray(feed.images) &&
                      feed.images.map((imageObj, index) => (
                        <img
                          key={index}
                          src={`http://localhost:8000/${imageObj.image_url}`}
                          alt={`Feed Image ${index + 1}`}
                          className="img-fluid feed-img"
                        />
                      ))}
                      <button
                        className="bookmark-btn"
                        onClick={() => handleBookmark(feed.id)}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" style={{ width: '24px', height: '24px', marginRight: '8px' }}>
                        <path d="M128 80V64a48.14 48.14 0 0148-48h224a48.14 48.14 0 0148 48v368l-80-64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                        <path d="M320 96H112a48.14 48.14 0 00-48 48v352l152-128 152 128V144a48.14 48.14 0 00-48-48z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                      </svg>
                      </button>
                  </div>
                  <p className="text-center">{feed.description}</p>
                  <p className="text-center text-muted">{feed.location}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No feeds available yet.</p>
            )}
          </div>
        </div>
        <div className="roight col-md-3 col-lg-2 order-1 order-sm-2">
          {isLoggedIn && (
            <div className="create-feed bg-light p-4">
              <h5>Have you seen a house you like:</h5>
              <h5>Share It:</h5>
              <h5 className="creat">Create a New Feed</h5>
              <div className="left-side">
              <input
                type="file"
                className="form-control mb-3"
                onChange={(event) => setNewFeed({ ...newFeed, image: event.target.files[0] })}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="form-control mb-3"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="form-control mb-3"
                onChange={handleInputChange}
              />
              <button className="btn1 btn-primary w-100" onClick={handleSubmit}>
                Submit
              </button>
              </div>
            </div>
              
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;