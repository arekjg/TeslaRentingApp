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
        <h5>{name}</h5>
        <p className="text-details">
          <span title="Number of seats">
            <img src="../images/SeatIcon.svg" className="details-icon svg-icon" alt="" />
            {seats}
          </span>
          &emsp;
          <span title="Cargo Capacity">
            <img
              src="../images/CapacityIcon.svg"
              className="details-icon svg-icon"
              alt=""
            />{" "}
            {capacity} cu ft&emsp;
          </span>
          <span title="Range">
            <img
              src="../images/RangeIcon.svg"
              className="details-icon svg-icon"
              alt=""
            />{" "}
            {range} mi
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
