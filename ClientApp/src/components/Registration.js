import React, { useState } from "react";

const Registration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    login: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  
  const handleFormChange = (e) => {
    let { name, value } = e.target;

    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let isValid = validateForm();

    if (isValid) {
      console.log(form);
    } else {
      console.log(errorMessage);
    }
  };

  const validateForm = () => {
    let isValid = true;
    let message = "";

    if (
      form.firstName === null ||
      form.firstName === "" ||
      form.lastName === null ||
      form.lastName === "" ||
      form.email === null ||
      form.email === "" ||
      form.phone === null ||
      form.phone === "" ||
      form.login === null ||
      form.login === "" ||
      form.password === null ||
      form.password === ""
    ) {
      message = "You must fill all fields in the form.";
      isValid = false;
    } else if (
      form.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) === null
    ) {
      message = "You must enter valid email address";
      isValid = false;
    } else if (form.phone.match(/^[0-9]+$/) === null) {
      message = "You must enter only numbers";
      isValid = false;
    }

    setErrorMessage(message);
    return isValid;
  };

  return (
    <form className="registration-container">
      <h3>Register</h3>

      <label className="first-name-label">First name:</label>

      <input
        type="text"
        name="firstName"
        className="first-name-input"
        placeholder="First name"
        onChange={handleFormChange}
        required
      ></input>

      <label className="last-name-label">Last name:</label>

      <input
        type="text"
        name="lastName"
        className="last-name-input"
        placeholder="Last name"
        onChange={handleFormChange}
        required
      ></input>

      <label className="email-label">Email:</label>

      <input
        type="text"
        name="email"
        className="email-input"
        placeholder="Email address"
        onChange={handleFormChange}
        required
      ></input>

      <label className="phone-label">Phone #:</label>

      <input
        type="text"
        name="phone"
        className="phone-input"
        placeholder="Phone #"
        onChange={handleFormChange}
        required
      ></input>

      <label className="login-label">Login:</label>

      <input
        type="text"
        name="login"
        className="login-input"
        placeholder="Login"
        onChange={handleFormChange}
        required
      ></input>

      <label className="password-label">Password:</label>

      <input
        type="password"
        name="password"
        className="password-input"
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

export default Registration;
