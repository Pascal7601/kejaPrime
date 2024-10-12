import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import '../styles/Profile.css'

function Profile() {
    const [userType, setUserType] = useState(''); 
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedHouses, setSavedHouses] = useState([]);

    useEffect(() => {
        async function fetchProfile() {
            try {
                 // Retrieve the token from localStorage
                const token = localStorage.getItem('access_token');

                // Set the Authorization header
                const config = {
                headers: {
                    Authorization: `Bearer ${token}`,  // Assuming you're using a Bearer token
                    },
                };
                const profileRes = await axios.get('http://localhost:8000/api/v1/users/profile', config);
                const isLandlord = profileRes.data.is_landlord;
                setUserType(isLandlord);

                const userId = profileRes.data.id;
                const userIdStr = String(userId)
                console.log(userIdStr);

                if (isLandlord) {
                    const postedHousesRes = await axios.get(`http://localhost:8000/api/v1/properties/${userIdStr}`);
                    const housesWithImages = await Promise.all(
                        postedHousesRes.data.map(async (house) => {
                            try {
                                // Try to get the image URL for the house
                                const imageRes = await axios.get(`http://localhost:8000/api/v1/properties/${house.id}/images`);
                                console.log('Image Response:', imageRes.data);
                                const img = imageRes.data.length > 0 ? imageRes.data[0].image_url : null;
                                return {
                                    ...house,
                                    imageUrl: img,  // Add image URL to the house object
                                };
                            } catch (error) {
                                if (error.response && error.response.status === 404) {
                                    // Handle 404 error (no image found)
                                    console.warn(`Image not found for house ${house.id}`);
                                    return {
                                        ...house,
                                        imageUrl: null,  // No image found, set imageUrl to null
                                    };
                                } else {
                                    console.error(`Error fetching image for house ${house.id}`, error);
                                    return house;  // Return the house object without modifying it
                                }
                            }
                        })
                    );
                    setHouses(housesWithImages);
                } else {
                    const savedHousesRes = await axios.get('http://localhost:8000/api/v1/houses/saved');
                    setHouses(savedHousesRes.data);
                    setSavedHouses(savedHousesRes.data.map(house => house.id));  // Track saved houses by ID
                }
            } catch (error) {
                console.error('Error fetching profile data', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleSaveHouse = (houseId) => {
        // Check if the house is already saved
        const isSaved = savedHouses.includes(houseId);
        
        if (!isSaved) {
            // Save the house
            setSavedHouses(prevSavedHouses => [...prevSavedHouses, houseId]);
            
            // Call API to save the house
            axios.post('/api/houses/save', { houseId })
                .then(res => {
                    console.log('House saved successfully');
                })
                .catch(err => {
                    console.error('Error saving house:', err);
                });
        }
    };

    const renderHouseImage = (imageUrl, title) => {
        const src = imageUrl ? `http://localhost:8000/${imageUrl}` : "/path/to/placeholder.jpg";
        const altText = imageUrl ? title : "No image available";

        return (
            <img 
                src={src} 
                alt={altText} 
                className="house-image"
            />
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="flex-container">
                <Navbar />
                <h3 className="profile-title">My Profile</h3>
                <h2>{userType ? 'Posted Houses' : 'Saved Houses'}</h2>
                <div className="house-list">
                    {houses.length === 0 ? (
                        <p>No houses found</p>
                    ) : (
                        houses.map(house => (
                            <div key={house.id} className="house-item">
                                {renderHouseImage(house.imageUrl, house.title)}
                                <h3>{house.title}</h3>
                                <p>{house.description}</p>
                                <p>Price: {house.price}</p>
                                <p>Location: {house.location}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="footing">
                    <Footer />             
                </div>
            </div>
        </div>
    );
}

export default Profile;