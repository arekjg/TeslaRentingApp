import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
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
    let { name, value } = e.target;
    
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    let isValid = true;
    const updatedFormErrors = { ...formErrors };

    if (form.firstName === null || form.firstName === "") {
      updatedFormErrors.firstName = "You must enter your name";
      isValid = false;
    }
    if (form.lastName === null || form.lastName === "") {
      updatedFormErrors.lastName = "You must enter your last name";
      isValid = false;
    }
    if (form.email === null || form.email === "") {
      updatedFormErrors.email = "You must enter your email address";
      isValid = false;
    }
    if (form.phone === null || form.phone === "") {
      updatedFormErrors.phone = "You must enter your phone number";
      isValid = false;
    }

    setFormErrors(updatedFormErrors);

    if (isValid) {
      navigate(
        `/confirmation?pickUpLocation=${pickUpLocation}&returnLocation=${returnLocation}&pickUpDate=${pickUpDateString}&returnDate=${returnDateString}&model=${id}&firstName=${form.firstName}&lastName=${form.lastName}&email=${form.email}&phone=${form.phone}`
      );
    }
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
          {formErrors.firstName && (
            <span className="error-message">{formErrors.firstName}</span>
          )}
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
          {formErrors.lastName && (
            <span className="error-message">{formErrors.lastName}</span>
          )}
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
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
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
          {formErrors.phone && (
            <span className="error-message">{formErrors.phone}</span>
          )}
        </div>
        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default User;
