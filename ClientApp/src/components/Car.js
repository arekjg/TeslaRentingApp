import React from "react";
import { useNavigate } from "react-router-dom";
import { SeatIcon, RangeIcon, CapacityIcon } from "./Icons";

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
        <p>
          <span className="text-model-name">{name}</span>
        </p>
        <p className="text-details">
          <span title="Number of seats">
            <SeatIcon />
            {seats}
          </span>
          &emsp;
          <span title="Cargo Capacity">
            <CapacityIcon />
            {capacity} cu ft&emsp;
          </span>
          <span title="Range">
            <RangeIcon /> {range} mi
          </span>
        </p>
      </div>
      <div className="car-price">
        <p>
          <span className="text-price-1">{price.toFixed(2)} &euro;</span>/day
        </p>
        <p>{(daysCount * price).toFixed(2)} &euro; TOTAL</p>
        <button onClick={handleReservation}>Select</button>
      </div>
    </div>
  );
};

export default Car;