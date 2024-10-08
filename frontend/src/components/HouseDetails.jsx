import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { housesData } from './Houses';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="container house-detail mt-5">
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <div className="image-container">
              <img
                src={house.images[currentIndex]}
                alt={`${house.title} - ${currentIndex + 1}`}
                className="img-fluid mb-3 house-image"
              />
              <div className="button-switch">
                <button className="btn btn-light carousel-control prev" onClick={prevImage}>
                  &#10094;
                </button>
                <button className="btn btn-light carousel-control next" onClick={nextImage}>
                  &#10095;
                </button>
              </div>
            </div>
          </div>

        <div className="col-md-6  d-flex flex-column ">
          <h2>{house.title}</h2>
          <p style={{ fontSize: '20px', fontWeight: "400"}}>Price: {house.price}</p>
          <p >Location: {house.location}</p>
          <p>{house.description}</p>
        </div>
      </div>
    </div>
  );
}

export default HouseDetails;
