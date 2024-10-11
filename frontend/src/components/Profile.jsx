import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css'

function Profile() {
    const [userType, setUserType] = useState(''); 
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
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
            <h1 className="profile-title">My Profile</h1>
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
        </div>
    );
}

export default Profile;
