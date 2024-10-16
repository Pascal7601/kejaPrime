import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
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
              console.log(imageResponse.data);
              console.log(imageResponse.data[0].image_url);
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
    <div className="renters-dashboard container mt-5">
      <Navbar />
      <h2>Renter's Dashboard</h2>
      <SearchBar onSearch={handleSearch} />

      <div className="listings mt-5">
        <h3>Results:</h3>
        {filteredListings.length === 0 ? (
          <p>Loading listings...</p>
        ) : filteredListings.length > 0 ? (
          <ul>
            {filteredListings.map((listing) => (
              <li key={listing.id}>
                <div>
                  <strong>{listing.location}</strong> - {listing.bedrooms} Bedrooms
									<p>{listing.description}</p>
                </div>
                {listing.imageUrl ? (
                  <img
                    src={`http://localhost:8000/${listing.imageUrl}`}
                    alt={`${listing.location} property`}
                    style={{ width: '200px', height: '150px' }}
                    onError={(e) => {
                      e.target.src = placeholderImage; // Set placeholder if image is not found
                    }}
                  />
                ) : (
                  <img
                    src={placeholderImage} 
                    alt="Placeholder" 
                    style={{ width: '200px', height: '150px' }}
                  />
                )}
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
