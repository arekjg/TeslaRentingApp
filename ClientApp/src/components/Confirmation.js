import React, { useEffect, useState } from "react";
import { getModel, postReservation } from "../fetcher";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const [model, setModel] = useState({
    errorMessage: "",
    data: {
      id: null,
      name: "",
      pricePerDay: null,
      imageName: "",
    },
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pickUpDateString = queryParams.get("pickUpDate");
  const returnDateString = queryParams.get("returnDate");
  const pickUpLocation = parseInt(queryParams.get("pickUpLocation"));
  const returnLocation = parseInt(queryParams.get("returnLocation"));
  const id = parseInt(queryParams.get("model"));

  const pickUpDate = Date.parse(pickUpDateString) / 1000 / 60 / 60 / 24;
  const returnDate = Date.parse(returnDateString) / 1000 / 60 / 60 / 24;
  const daysCount = returnDate - pickUpDate + 1;

  const firstName = queryParams.get("firstName");
  const lastName = queryParams.get("lastName");
  const email = queryParams.get("email");
  const phone = queryParams.get("phone");

  const carData = {
    carId: id,
    userId: null,
    dateStart: pickUpDate,
    dateEnd: returnDate,
    locIdStart: pickUpLocation,
    locIdEnd: returnLocation,
    cost: parseFloat((daysCount * model.data.pricePerDay).toFixed(2)),
  }

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getModel(id);
      setModel(responseObject);
    };
    fetchData();
  }, [id]);

  const handleConfirm = async (e) => {
    e.preventDefault();

    const userResponse = await fetch("https://localhost:7292/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());

    carData.userId = userResponse.id;

    postReservation(carData);
  };

  return (
    <div className="confirm-container">
      <div className="car-image">
        <img src={`../images/${model.data.imageName}`} alt={model.data.name} />
      </div>
      <div className="car-details">{model.data.name}</div>
      <div className="car-price">
        <p>{(daysCount * model.data.pricePerDay).toFixed(2)} &euro; TOTAL</p>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Confirmation;
