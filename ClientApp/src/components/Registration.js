import React from "react";

const Registration = () => {
  return (
    <form className="registration-container">
      <h3>Register</h3>

      <label className="first-name-label">First name:</label>

      <input
        type="text"
        name="firstName"
        className="first-name-input"
        placeholder="First name"
        required
      ></input>

      <label className="last-name-label">Last name:</label>

      <input
        type="text"
        name="lastName"
        className="last-name-input"
        placeholder="Last name"
        required
      ></input>

      <label className="email-label">Email:</label>

      <input
        type="text"
        name="email"
        className="email-input"
        placeholder="Email address"
        required
      ></input>

      <label className="phone-label">Phone #:</label>

      <input
        type="text"
        name="phone"
        className="phone-input"
        placeholder="Phone #"
        required
      ></input>

      <label className="login-label">Login:</label>

      <input
        type="text"
        name="login"
        className="login-input"
        placeholder="Login"
        required
      ></input>

      <label className="password-label">Password:</label>

      <input
        type="password"
        name="password"
        className="password-input"
        placeholder="Password"
        required
      ></input>

      <div className="btn-right">
        <button>Register</button>
      </div>
    </form>
  );
};

export default Registration;
