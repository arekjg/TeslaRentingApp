import React, { useEffect, useState } from "react";
import { getReservation } from "../fetcher";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuid = queryParams.get("uuid");

  const [reservation, setReservation] = useState({
    errorMessage: "",
    data: {
      id: uuid,
      carId: "",
      userId: "",
      dateStart: "",
      dateEnd: "",
      locIdStart: "",
      locIdEnd: "",
      cost: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationData = async () => {
      const reservationResponseObject = await getReservation(uuid);
      setReservation(reservationResponseObject);
    };
    fetchReservationData();
  }, [uuid]);

  return (
    <div className="reservation-container">
      <h3>Thank you for your reservation!</h3>
      <div>
        <p>Your unique identification number:</p>
        <p>
          {reservation.errorMessage && (
            <div className="error-message">
              Error: {reservation.errorMessage}{" "}
            </div>
          )}
          <strong>{reservation.data.uuid}</strong>
        </p>
      </div>

      <div className="btn-right">
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default Confirmation;
