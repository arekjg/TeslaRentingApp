import React from "react";
import { useNavigate } from "react-router-dom";

const Car = ({
  id,
  name,
  price,
  imageName,
  seats,
  capacity,
  range,
  pickUpDateString,
  returnDateString,
  pickUpLocation,
  returnLocation,
}) => {
  const pickUpDate = Date.parse(pickUpDateString);
  const returnDate = Date.parse(returnDateString);
  const daysCount = (returnDate - pickUpDate) / 1000 / 60 / 60 / 24 + 1;

  const navigate = useNavigate();

  const handleReservation = () => {
    navigate(
      `/user?pickUpLocation=${pickUpLocation}&returnLocation=${returnLocation}&pickUpDate=${pickUpDateString}&returnDate=${returnDateString}&model=${id}`
    );
  };

  return (
    <div className="car-container">
      <div className="car-image">
        <img src={`../images/${imageName}`} alt={name} />
      </div>
      <div className="car-details">
        <p>{name}</p>
        <p>Seats: {seats}</p>
        <p>Capacity: {capacity} cu ft</p>
        <p>Range: {range} mi</p>
      </div>
      <div className="car-price">
        <p>{price.toFixed(2)} &euro;/day</p>
        <p>{(daysCount * price).toFixed(2)} &euro; TOTAL</p>
        <button onClick={handleReservation}>Select</button>
      </div>
    </div>
  );
};

export default Car;
