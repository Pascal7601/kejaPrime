import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostHouse.css';
import Navbar from '../components/Navbar';

function PostHouse() {
    const [formData, setFormData] = useState({
        image_url: null,
        name: '',
        bedrooms: '',
        price: '',
        location: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image_url: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // get the token from local storage
            const token = localStorage.getItem('access_token');
            const propertyPayload = {
                name: formData.name,
                bedrooms: formData.bedrooms,
                price: formData.price,
                location: formData.location,
                description: formData.description,
            };

            const propertyResponse = await axios.post('http://localhost:8000/api/v1/properties/property', propertyPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // pass the token to the server
                },
            });

            const propertyId = propertyResponse.data.id; // Get the property ID from response
            // Upload image_url to the property-specific route
            const imagePayload = new FormData();
            imagePayload.append('file', formData.image_url);

            await axios.post(`http://localhost:8000/api/v1/properties/${propertyId}/images`, imagePayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('House posted successfully!');
            setFormData({
                image_url: null,
                name: '',
                bedrooms: '',
                price: '',
                location: '',
                description: ''
            });
        } catch (error) {
            console.error('Error posting the house:', error);
            setMessage('Failed to post house. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-house-page">
            <h2>Post Your Apartment for Rent</h2>
            <form onSubmit={handleSubmit} className="post-house-form">
                <div className="form-group">
                    <label htmlFor="image_url">Apartment Image:</label>
                    <input
                        type="file"
                        id="image_url"
                        name="image_url"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Title:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bedrooms">Bedrooms:</label>
                    <input
                        type="text"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (Ksh):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Apartment'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default PostHouse;
