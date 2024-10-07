import React from 'react';
import { useParams } from 'react-router-dom';
import { housesData } from './Houses';

function HouseDetails() {
  const { id } = useParams();
  console.log('housesData:', housesData);
  const house = housesData.find((house) => house.id === parseInt(id));

  if (!house) {
    return <div>House not found</div>;
  }

  return (
    <div className="house-details">
      <img src={house.image} alt={house.title} className="house-image" />
      <h2>{house.title}</h2>
      <p>Price: {house.price}</p>
      <p>Location: {house.location}</p>
      <p>{house.description}</p>
    </div>
  );
}

export default HouseDetails;
