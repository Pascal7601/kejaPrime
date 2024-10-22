import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import '../styles/Dashboard.css';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedHouses, setSavedHouses] = useState([]);
  const placeholderImage = 'http://localhost:8000/uploads/placeholder-image.jpg'; // URL of your placeholder image

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/properties');
        const properties = response.data;

        // Fetch images for each property
        const listingsWithImages = await Promise.all(
          properties.map(async (property) => {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8000/api/v1/properties/${property.id}/images`
              );
              // console.log(imageResponse.data);
              // console.log(imageResponse.data[0].image_url);
              return { ...property, imageUrl: imageResponse.data[0].image_url };
            } catch (imageError) {
              console.error(`Error fetching image for property ${property.id}:`, imageError);
              return { ...property, imageUrl: null }; // Default to null if error
            }
          })
        );

        setListings(listingsWithImages);
        setFilteredListings(listingsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const savedHousesRes = await axios.get('http://localhost:8000/api/v1/houses/saved', config);
      setSavedHouses(savedHousesRes.data);
    } catch (error) {
      console.error('Error fetching saved houses:', error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch saved houses when the component mounts
  }, []);
  const handleBookmark = async (houseId) => {
    const isSaved = savedHouses.includes(houseId);
    if (!isSaved) {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
  
        await axios.post(`http://localhost:8000/api/v1/houses/save`, { houseId }, config);
        setSavedHouses(prevSavedHouses => [...prevSavedHouses, houseId]);

        const savedHousesRes = await axios.get('http://localhost:8000/api/v1/houses/saved', config);
        setSavedHouses(savedHousesRes.data);
        console.log('House saved successfully');
      } catch (err) {
        console.error('Error saving house:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (criteria) => {
    const { location, bedrooms } = criteria;

    const filtered = listings.filter((listing) => {
      return (
        (!location || listing.location.toLowerCase().includes(location.toLowerCase())) &&
        (!bedrooms || listing.bedrooms === parseInt(bedrooms))
      );
    });

    setFilteredListings(filtered);
  };

  return (
    <div className="renters-dashboard container">
      <Navbar />
      <h2 className="title">Available Rental Apartments</h2>
      <SearchBar onSearch={handleSearch} />

      <div className="listings mt-5">
        <h3>Results:</h3>
      {filteredListings.length === 0 ? (
        <p>Loading listings...</p>
      ) : filteredListings.length > 0 ? (
        <ul className="unordered">
          {filteredListings.map((listing) => (
            <li className="cont" key={listing.id}>
              {/* Image appears before the content */}
              {listing.imageUrl ? (
                <img
                  src={`http://localhost:8000/${listing.imageUrl}`}
                  alt={`${listing.location} property`}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = placeholderImage; // Set placeholder if image is not found
                  }}
                />
              ) : (
                <img
                  src={placeholderImage}
                  alt="Placeholder"
                  className="card-image"
                />
              )}
              <button
                  className="bookmark-btn"
                  onClick={() => handleBookmark(listing.id)}
                >
                  Bookmark
              </button>
              <div className="card-content">
                <p>{listing.description}</p>
                <strong className="dash">{listing.location}</strong> - {listing.bedrooms} Bedrooms

              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
      </div>
    </div>
  );
}

export default Dashboard;
