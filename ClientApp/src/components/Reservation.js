import React from "react";
import { CapacityIcon, RangeIcon, SeatIcon, TrashIcon } from "./Icons";
import { deleteReservation } from "../fetcher";

const Reservation = ({
  id,
  car,
  dateStart,
  dateEnd,
  startLocation,
  endLocation,
  cost,
  setReservations,
}) => {
  let startDate = new Date(dateStart * 1000 * 60 * 60 * 24).toLocaleDateString(
    "en-GB"
  );
  let endDate = new Date(dateEnd * 1000 * 60 * 60 * 24).toLocaleDateString(
    "en-GB"
  );

  const handleDeleteClick = async (e) => {
    const responseObject = await deleteReservation(id);

    if (responseObject.data) {
      setReservations(responseObject);
    }
  };

  return (
    <div className="user-res-container">
      <h5>{car.name}</h5>
      <div className="user-res-car">
        <div className="car-image">
          <img src={`../images/${car.imageName}`} alt={car} />
        </div>
        <p className="text-details">
          <SeatIcon seats={car.seats} />
          &emsp;
          <CapacityIcon capacity={car.capacity} />
          <RangeIcon range={car.range} />
        </p>
      </div>

      <div className="user-res-details">
        <p>
          Pick up:
          <br />
          {startDate} in {startLocation.name}
        </p>
        <p>
          Return:
          <br />
          {endDate} in {endLocation.name}
        </p>
      </div>

      <div className="user-res-price">
        <span className="user-res-cost">{cost.toFixed(2)} &euro; TOTAL</span>
        <span className="user-res-delete" onClick={() => handleDeleteClick()}>
          <TrashIcon />
        </span>
      </div>
    </div>
  );
};

export default Reservation;
