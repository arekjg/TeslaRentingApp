import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CapacityIcon, RangeIcon, SeatIcon } from "./Icons";
import { UserContext } from "../App";

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
  const { user } = useContext(UserContext);

  const pickUpDate = Date.parse(pickUpDateString);
  const returnDate = Date.parse(returnDateString);
  const daysCount = (returnDate - pickUpDate) / 1000 / 60 / 60 / 24 + 1;

  const navigate = useNavigate();

  const handleReservation = () => {
    if (!user) {
      navigate(
        `/user?pickUpLocation=${pickUpLocation}&returnLocation=${returnLocation}&pickUpDate=${pickUpDateString}&returnDate=${returnDateString}&model=${id}`
      );
    } else {
      navigate(
        `/summary?pickUpLocation=${pickUpLocation}&returnLocation=${returnLocation}&pickUpDate=${pickUpDateString}&returnDate=${returnDateString}&model=${id}&firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}&phone=${user.phone}`
      );
    }
  };

  return (
    <div className="car-container">
      <div className="car-image">
        <img src={`../images/${imageName}`} alt={name} />
      </div>
      <div className="car-details">
        <h5>{name}</h5>
        <p className="text-details">
          <SeatIcon seats={seats} />
          &emsp;
          <CapacityIcon capacity={capacity} />
          <RangeIcon range={range} />
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
