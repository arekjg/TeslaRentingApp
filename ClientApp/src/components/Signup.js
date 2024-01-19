import React, { useState } from "react";
import { postRegisteredUser } from "../fetcher";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    login: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    login: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { name, value } = e.target;

    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let isValid = validateForm();

    if (isValid) {
      await postRegisteredUser(form);

      navigate("/registration");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const updatedFormErrors = { ...formErrors };
    let message = "";

    if (form.firstName === "") {
      updatedFormErrors.firstName = true;
      isValid = false;
    } else {
      updatedFormErrors.firstName = false;
    }
    if (form.lastName === "") {
      updatedFormErrors.lastName = true;
      isValid = false;
    } else {
      updatedFormErrors.lastName = false;
    }
    if (form.email === "") {
      updatedFormErrors.email = true;
      isValid = false;
    } else if (
      form.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) === null
    ) {
      updatedFormErrors.email = true;
      isValid = false;
    } else {
      updatedFormErrors.email = false;
    }
    if (form.phone === "") {
      updatedFormErrors.phone = true;
      isValid = false;
    } else if (form.phone.match(/^[0-9]+$/) === null) {
      updatedFormErrors.phone = true;
      isValid = false;
    } else {
      updatedFormErrors.phone = false;
    }
    if (form.login === "") {
      updatedFormErrors.login = true;
      isValid = false;
    } else {
      updatedFormErrors.login = false;
    }
    if (form.password === "") {
      updatedFormErrors.password = true;
      isValid = false;
    } else {
      updatedFormErrors.password = false;
    }

    if (!isValid) {
      message = "Empty or invalid input";
    }

    setErrorMessage(message);
    setFormErrors(updatedFormErrors);
    return isValid;
  };

  return (
    <form className="registration-container">
      <h3>Register</h3>

      <label className="first-name-label">First name:</label>

      <input
        type="text"
        name="firstName"
        className={`first-name-input ${formErrors.firstName && "error"}`}
        placeholder="First name"
        onChange={handleFormChange}
        required
      ></input>

      <label className="last-name-label">Last name:</label>

      <input
        type="text"
        name="lastName"
        className={`last-name-input ${formErrors.lastName && "error"}`}
        placeholder="Last name"
        onChange={handleFormChange}
        required
      ></input>

      <label className="email-label">Email:</label>

      <input
        type="text"
        name="email"
        className={`email-input" ${formErrors.email && "error"}`}
        placeholder="Email address"
        onChange={handleFormChange}
        required
      ></input>

      <label className="phone-label">Phone #:</label>

      <input
        type="text"
        name="phone"
        className={`phone-input ${formErrors.phone && "error"}`}
        placeholder="Phone #"
        onChange={handleFormChange}
        required
      ></input>

      <label className="login-label">Login:</label>

      <input
        type="text"
        name="login"
        className={`login-input ${formErrors.login && "error"}`}
        placeholder="Login"
        onChange={handleFormChange}
        required
      ></input>

      <label className="password-label">Password:</label>

      <input
        type="password"
        name="password"
        className={`password-input ${formErrors.password && "error"}`}
        placeholder="Password"
        onChange={handleFormChange}
        required
      ></input>

      {errorMessage && <span className="error-message">{errorMessage}</span>}

      <div className="btn-right">
        <button onClick={handleRegister}>Register</button>
      </div>
    </form>
  );
};

export default Signup;
