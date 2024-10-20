import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import PostHouse from '../pages/PostHouse';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [userType, setUserType] = useState(false);
  const [houses, setHouses] = useState([]);
  const [feeds, setFeeds] = useState([]); // State for tenant's feeds
  const [loading, setLoading] = useState(true);
  const [savedHouses, setSavedHouses] = useState([]);
  const [activeTab, setActiveTab] = useState('houses');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('access_token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const profileRes = await axios.get('http://localhost:8000/api/v1/users/profile', config);
        const isLandlord = profileRes.data.is_landlord;
        console.log(profileRes.data.id);
        setUserType(isLandlord);
        setProfile(profileRes.data);

        const userId = profileRes.data.id;

        if (isLandlord) {
          // Fetch posted houses
          const postedHousesRes = await axios.get(`http://localhost:8000/api/v1/properties/${userId}`);
          const housesWithImages = await Promise.all(
            postedHousesRes.data.map(async (house) => {
              try {
                const imageRes = await axios.get(`http://localhost:8000/api/v1/properties/${house.id}/images`);
                const img = imageRes.data.length > 0 ? imageRes.data[0].image_url : null;
                return { ...house, imageUrl: img };
              } catch (error) {
                console.warn(`Image not found for house ${house.id}`);
                return { ...house, imageUrl: null };
              }
            })
          );
          setHouses(housesWithImages);
        } else {
          // Fetch saved houses and tenant's feeds
        //   const savedHousesRes = await axios.get('http://localhost:8000/api/v1/houses/saved', config);
        //   setHouses(savedHousesRes.data);
        //   setSavedHouses(savedHousesRes.data.map(house => house.id)); // Track saved houses by ID

          // Fetch tenant's feeds
          const tenantFeedsRes = await axios.get(`http://localhost:8000/api/v1/feeds/me`, config);
          console.log(tenantFeedsRes.data);
          setFeeds(tenantFeedsRes.data);
        }
      } catch (error) {
        console.error('Error fetching profile data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);  // Change active tab
  };

  const handleSaveHouse = (houseId) => {
    const isSaved = savedHouses.includes(houseId);
    if (!isSaved) {
      setSavedHouses(prevSavedHouses => [...prevSavedHouses, houseId]);
      axios.post('/api/houses/save', { houseId })
        .then(res => console.log('House saved successfully'))
        .catch(err => console.error('Error saving house:', err));
    }
  };
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const renderHouseImage = (imageUrl, title) => {
    const src = imageUrl ? `http://localhost:8000/${imageUrl}` : "/path/to/placeholder.jpg";
    const altText = imageUrl ? title : "No image available";
    return <img src={src} alt={altText} className="house-image" />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="profile-page">
      <div className='container my-5 profile-container d-flex'>
        {/* Left Side Panel (For Landlords) */}
        <div className='left-panel'>
          <h4 onClick={toggleFormVisibility} className='toggle-button'>
            {isFormVisible ? 'Hide Form' : 'Post a House'}
          </h4>
          {isFormVisible && <PostHouse />}
        </div>
        {/* Right Side Content */}
        <div className='right-panel'>
          <div className="profile-header">
            <div className='profile-picture-placeholder border rounded-circle p-5 bg-light'>
              <p>Profile Picture (Add Later)</p>
            </div>
          </div>
          {/* Navigation Tabs */}
          <div className="profile-tabs mb-4">
            <button
              className={`tab-button ${activeTab === 'houses' ? 'active' : ''}`}
              onClick={() => handleTabChange('houses')}
            >
              {userType ? 'Posted Houses' : 'Saved Houses'}
            </button>
            {!userType && (
              <button
                className={`tab-button ${activeTab === 'feeds' ? 'active' : ''}`}
                onClick={() => handleTabChange('feeds')}
              >
                My Feeds
              </button>
            )}
            <button
              className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleTabChange('about')}
            >
              About Me
            </button>
          </div>
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'houses' && (
              <div className="houses-section">
                <h2>{userType ? 'Posted Houses' : 'Saved Houses'}</h2>
                <div className="house-list">
                  {houses.length === 0 ? (
                    <p>No houses found</p>
                  ) : (
                    houses.map(house => (
                      <div key={house.id} className="house-item">
                        <div className='card'>
                          {renderHouseImage(house.imageUrl, house.title)}
                          <div className='card-body'>
                            <h3 className='card-title'>{house.title}</h3>
                            <p className='card-text'>{house.description}</p>
                            <p className='card-text fw-bold'>Price: {house.price}</p>
                            <p className='card-text fw-bold'>Location: {house.location}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {!userType && activeTab === 'feeds' && (
              <div className="feeds-section">
                <h2>My Feeds</h2>
                <div className="feed-list">
                  {feeds.length === 0 ? (
                    <p>No feeds found</p>
                  ) : (
                    feeds.map(feed => (
                      <div key={feed.id} className="feed-item">
                        <img src={`http://localhost:8000/${feed.images[0].image_url}`} alt={feed.description} className="feed-image" />
                        <p>{feed.description}</p>
                        <p>{feed.location}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {activeTab === 'about' && (
              <div className="profile-about">
                <h4>About Me</h4>
                {profile && (
                  <div>
                    <p>Name: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Status: {profile.is_landlord ? "Landlord" : "Tenant"}</p>
                    <p>Location: {profile.location}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Profile;