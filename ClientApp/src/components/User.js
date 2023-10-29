import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pickUpDateString = queryParams.get("pickUpDate");
  const returnDateString = queryParams.get("returnDate");
  const pickUpLocation = queryParams.get("pickUpLocation");
  const returnLocation = queryParams.get("returnLocation");
  const id = queryParams.get("model");

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleNext = () => {
    // TODO - validation

    navigate(
      `/confirmation?pickUpLocation=${pickUpLocation}&returnLocation=${returnLocation}&pickUpDate=${pickUpDateString}&returnDate=${returnDateString}&model=${id}&firstName=${form.firstName}&lastName=${form.lastName}&email=${form.email}&phone=${form.phone}`
    );
  };

  return (
    <div className="user-container">
      <form>
        <div>
          <label>First name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleFormChange}
            required
          ></input>
        </div>
        <div>
          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleFormChange}
            required
          ></input>
        </div>
        <div>
          <label>Email address:</label>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            onChange={handleFormChange}
            required
          ></input>
        </div>
        <div>
          <label>Phone #:</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone #"
            onChange={handleFormChange}
            required
          ></input>
        </div>
        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default User;
