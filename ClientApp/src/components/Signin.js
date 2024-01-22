import React, { useState } from "react";
import { putSignInUser } from "../fetcher";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
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

  const handleSignin = async (e) => {
    e.preventDefault();

    let isValid = validateForm();

    if (isValid) {
      const guid = await putSignInUser(form);
      if (guid.error === "400") {
        setErrorMessage("Wrong login or password!");
      } else {
        navigate("/loggedin");
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const updatedFormErrors = { ...formErrors };
    let message = "";

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
      message = "You must enter your credentials";
    }

    setErrorMessage(message);
    setFormErrors(updatedFormErrors);
    return isValid;
  };

  return (
    <form className="login-container">
      <h3>Sign in</h3>

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
        <button onClick={handleSignin}>Sign in</button>
      </div>
    </form>
  );
};

export default Signin;