import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostHouse.css';
import Navbar from '../components/Navbar';

function PostHouse() {
    const [formData, setFormData] = useState({
        image: null,
        title: '',
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
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formPayload = new FormData();
        formPayload.append('image', formData.image);
        formPayload.append('title', formData.title);
        formPayload.append('price', formData.price);
        formPayload.append('location', formData.location);
        formPayload.append('description', formData.description);

        try {
            const response = await axios.post('/api/houses/post', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('House posted successfully!');
            setFormData({
                image: null,
                title: '',
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
                    <label htmlFor="image">Apartment Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (USD):</label>
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
