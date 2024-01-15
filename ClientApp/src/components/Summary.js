import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocation, getModel, postReservation, postUnregisteredUser } from "../fetcher";
import { CapacityIcon, RangeIcon, SeatIcon } from "./Icons";

const Summary = () => {
  const [startLocation, setStartLocation] = useState({
    errorMessage: "",
    data: [],
  });
  const [endLocation, setEndLocation] = useState({
    errorMessage: "",
    data: [],
  });

  const [model, setModel] = useState({
    errorMessage: "",
    data: {
      id: null,
      name: "",
      pricePerDay: null,
      imageName: "",
      seats: "",
      capacity: "",
      range: "",
    },
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pickUpDateString = queryParams.get("pickUpDate");
  const returnDateString = queryParams.get("returnDate");
  const pickUpLocation = parseInt(queryParams.get("pickUpLocation"));
  const returnLocation = parseInt(queryParams.get("returnLocation"));
  const modelId = parseInt(queryParams.get("model"));

  const pickUpDate = Date.parse(pickUpDateString) / 1000 / 60 / 60 / 24;
  const returnDate = Date.parse(returnDateString) / 1000 / 60 / 60 / 24;
  const daysCount = returnDate - pickUpDate + 1;

  const firstName = queryParams.get("firstName");
  const lastName = queryParams.get("lastName");
  const email = queryParams.get("email");
  const phone = queryParams.get("phone");

  const reservationData = {
    carId: modelId,
    userId: null,
    dateStart: pickUpDate,
    dateEnd: returnDate,
    locIdStart: pickUpLocation,
    locIdEnd: returnLocation,
    cost: parseFloat((daysCount * model.data.pricePerDay).toFixed(2)),
  };

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelData = async () => {
      const modelResponseObject = await getModel(modelId);
      setModel(modelResponseObject);
    };
    fetchModelData();

    const fetchStartLocationData = async () => {
      const startLocResponseObject = await getLocation(pickUpLocation);
      setStartLocation(startLocResponseObject);
    };
    fetchStartLocationData();

    const fetchEndLocationData = async () => {
      const returnLocResponseObject = await getLocation(returnLocation);
      setEndLocation(returnLocResponseObject);
    };
    fetchEndLocationData();
  }, [modelId, pickUpLocation, returnLocation]);

  const handleConfirm = async (e) => {
    e.preventDefault();

    const userResponseObject = await postUnregisteredUser(userData);
    console.log(userResponseObject);
    console.log(userResponseObject.data.id);
    reservationData.userId = userResponseObject.data.id;
    console.log(reservationData);
    await postReservation(reservationData);

    navigate("/reservation");
  };

  return (
    <div className="summary-container">
      <h3>Reservation summary</h3>

      <div className="car-summary">
        {model.errorMessage && (
          <div className="error-message">Error: {model.errorMessage} </div>
        )}
        <h4>{model.data.name}</h4>
        <div className="car-image">
          <img
            src={`../images/${model.data.imageName}`}
            alt={model.data.name}
          />
        </div>

        <p className="text-details">
          <SeatIcon seats={model.data.seats} />
          &emsp;
          <CapacityIcon capacity={model.data.capacity} />
          <RangeIcon range={model.data.range} />
        </p>
      </div>

      <div className="user-summary">
        <p>
          Name:{" "}
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
        <p>
          Email: <strong>{email}</strong>
        </p>
        <p>
          Phone: <strong>{phone}</strong>
        </p>
      </div>

      <div className="reservation-summary">
        <p>
          Pick up: <strong>{pickUpDateString.replaceAll("-", "/")}</strong> in{" "}
          <strong>{startLocation.data.name}</strong>
          {startLocation.errorMessage && (
            <div className="error-message">
              Error: {startLocation.errorMessage}{" "}
            </div>
          )}
        </p>
        <p>
          Return: <strong>{returnDateString.replaceAll("-", "/")}</strong> in{" "}
          <strong>{endLocation.data.name}</strong>
          {endLocation.errorMessage && (
            <div className="error-message">
              Error: {endLocation.errorMessage}{" "}
            </div>
          )}
        </p>
      </div>

      <div className="cost-summary">
        <p>
          Total cost: <strong>{reservationData.cost} &euro;</strong>
        </p>
      </div>

      <div className="btn-right">
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Summary;
