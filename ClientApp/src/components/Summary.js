import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getReservation, getModel, getUser, getLocation } from "../fetcher";

const Summary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = parseInt(queryParams.get("reservationId"));

  const [reservation, setReservation] = useState({
    errorMessage: "",
    data: {
      id: id,
      carId: "",
      userId: "",
      dateStart: "",
      dateEnd: "",
      locIdStart: "",
      locIdEnd: "",
      cost: "",
    },
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

  const [user, setUser] = useState({
    errorMessage: "",
    data: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const [startLocation, setStartLocation] = useState({
    errorMessage: "",
    data: {
      id: "",
      name: "",
    },
  });

  const [endLocation, setEndLocation] = useState({
    errorMessage: "",
    data: {
      id: "",
      name: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationData = async () => {
      const reservationResponseObject = await getReservation(id);
      setReservation(reservationResponseObject);
    };
    fetchReservationData();

    const fetchModelData = async () => {
      const modelResponseObject = await getModel(reservation.data.carId);
      setModel(modelResponseObject);
    };
    fetchModelData();

    const fetchUserData = async () => {
      const userResponseObject = await getUser(reservation.data.userId);
      setUser(userResponseObject);
    };
    fetchUserData();

    const fetchStartLocationData = async () => {
      const startLocationResponseObject = await getLocation(
        reservation.data.locIdStart
      );
      setStartLocation(startLocationResponseObject);
    };
    fetchStartLocationData();

    const fetchEndLocationData = async () => {
      const endLocationResponseObject = await getLocation(
        reservation.data.locIdEnd
      );
      setEndLocation(endLocationResponseObject);
    };
    fetchEndLocationData();
  }, [
    id,
    reservation.data.carId,
    reservation.data.userId,
    reservation.data.locIdStart,
    reservation.data.locIdEnd,
  ]);

  return (
    <div className="summary-container">
      <h2>Your reservation is saved!</h2>
      <div className="car-summary">
        <p>Car details</p>
        <div className="car-image">
          {" "}
          <img
            src={`../images/${model.data.imageName}`}
            alt={model.data.name}
          />
        </div>
        <p>Seats: {model.data.seats}</p>
        <p>Capacity: {model.data.capacity}</p>
        <p>Range: {model.data.range}</p>
      </div>
      <div className="reservation-summary">
        <p>
          You pick the car from {startLocation.data.name} on{" "}
          {reservation.data.dateStart}
        </p>
        <p>
          You return the car in {endLocation.data.name} on{" "}
          {reservation.data.dateStart}
        </p>
      </div>
      <div className="user-summary">
        <h4>Your data:</h4>
        <p>
          Name: {user.data.firstName} {user.data.lastName}
        </p>
        <p>Email: {user.data.email}</p>
        <p>Phone: {user.data.phone}</p>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default Summary;
