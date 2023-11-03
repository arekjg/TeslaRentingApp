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

    let isValid = validateForm();

    if (isValid) {
      navigate(
        `/summary?pickUpLocation=${pickUpLocation}&returnLocation=${returnLocation}&pickUpDate=${pickUpDateString}&returnDate=${returnDateString}&model=${id}&firstName=${form.firstName}&lastName=${form.lastName}&email=${form.email}&phone=${form.phone}`
      );
    }
  };

  const validateForm = () => {
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
    if (form.phone.match(/^[0-9]+$/) === null) {
      console.log("asd");
      updatedFormErrors.phone = "You must enter only numbers";
      isValid = false;
    }

    setFormErrors(updatedFormErrors);
    return isValid;
  };

  return (
    <form className="user-container">
      <h3>Driver's credentials</h3>

      <label className="first-name-label">First name:</label>

      <input
        type="text"
        name="firstName"
        className={`first-name-input ${formErrors.firstName && "error"}`}
        placeholder="First name"
        onChange={handleFormChange}
        required
      ></input>

      {formErrors.firstName && (
        <span className="first-name-error error-message">
          {formErrors.firstName}
        </span>
      )}

      <label className="last-name-label">Last name:</label>

      <input
        type="text"
        name="lastName"
        className={`last-name-input ${formErrors.lastName && "error"}`}
        placeholder="Last name"
        onChange={handleFormChange}
        required
      ></input>

      {formErrors.lastName && (
        <span className="last-name-error error-message">
          {formErrors.lastName}
        </span>
      )}

      <label className="email-label">Email address:</label>

      <input
        type="text"
        name="email"
        className={`email-input ${formErrors.email && "error"}`}
        placeholder="Email address"
        onChange={handleFormChange}
        required
      ></input>

      {formErrors.email && (
        <span className="email-error error-message">{formErrors.email}</span>
      )}

      <label className="phone-label">Phone #:</label>

      <input
        type="text"
        name="phone"
        className={`phone-input ${formErrors.phone && "error"}`}
        placeholder="Phone #"
        onChange={handleFormChange}
        required
      ></input>

      {formErrors.phone && (
        <span className="phone-error error-message">{formErrors.phone}</span>
      )}

      <div className="btn-right">
        <button onClick={handleNext}>Next</button>
      </div>
    </form>
  );
};

export default User;
