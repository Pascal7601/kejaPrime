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
                const profileRes = await axios.get('/api/profile');
                const { userType } = profileRes.data;
                setUserType(userType);

                if (userType === 'landlord') {
                    const postedHousesRes = await axios.get('/api/houses/posted');
                    setHouses(postedHousesRes.data);
                } else if (userType === 'tenant') {
                    const savedHousesRes = await axios.get('/api/houses/saved');
                    setHouses(savedHousesRes.data);
                    setSavedHouses(savedHousesRes.data.map(house => house.id));
                }
            } catch (error) {
                console.error('Error fetching profile data', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="flex-container">
                <Navbar />
                <h3 className="profile-title">My Profile</h3>
                <h2>{userType === 'landlord' ? 'Posted Houses' : 'Saved Houses'}</h2>
                <div className="house-list">
                    {houses.length === 0 ? (
                        <p>No houses found</p>
                    ) : (
                        houses.map((house) => (
                            <div key={house.id} className="house-item">
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


export default Profile;
