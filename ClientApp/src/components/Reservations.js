import React, { useContext, useEffect, useState } from "react";
import { getUserReservations } from "../fetcher";
import { UserContext } from "../App";
import Reservation from "./Reservation";

const Reservations = () => {
  const { user } = useContext(UserContext);

  const [reservations, setReservations] = useState({
    errorMessage: "",
    data: [],
  });

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const responseObject = await getUserReservations(user.id);
        setReservations(responseObject);
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="reservations-list">
      {!user && <h3>Sign in to see your reservations.</h3>}

      {reservations.errorMessage && (
        <div className="error-message">Error: {reservations.errorMessage} </div>
      )}

      {user && <h3>Your reservations</h3>}

      {user && reservations.data.length === 0 && <span>You have no reservations.</span>}

      {reservations.data
        .sort((a, b) => a.dateStart - b.dateStart)
        .map((reservation) => (
          <Reservation
            key={reservation.id}
            id={reservation.id}
            car={reservation.car}
            dateStart={reservation.dateStart}
            dateEnd={reservation.dateEnd}
            startLocation={reservation.startLocation}
            endLocation={reservation.endLocation}
            cost={reservation.cost}
            setReservations={setReservations}
          />
        ))}
    </div>
  );
};

export default Reservations;
