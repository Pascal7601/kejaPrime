import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { housesData } from './Houses';
import '../styles/HouseDetails.css';

function HouseDetails() {
  const { id } = useParams();
  const house = housesData.find((house) => house.id === parseInt(id));
  const [currentIndex, setCurrentIndex] = useState(0);


  if (!house || !Array.isArray(house.images)) {
    return <div>House not found or no images available.</div>;
  }
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % house.images.length);
  };
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + house.images.length) % house.images.length);
  };
  
  return (
    <div className="house-details">
       <div className="house-images">
        <button className="carousel-control prev" onClick={prevImage}>&#10094;</button>
        <img 
          src={house.images[currentIndex]} 
          alt={`${house.title} - ${currentIndex + 1}`} 
          className="house-image" 
        />
        <button className="carousel-control next" onClick={nextImage}>&#10095;</button>
      </div>
      <div>
        <h2>{house.title}</h2>
        <p>Price: {house.price}</p>
        <p>Location: {house.location}</p>
        <p>{house.description}</p>
      </div>
    </div>
  );
}

export default HouseDetails;
