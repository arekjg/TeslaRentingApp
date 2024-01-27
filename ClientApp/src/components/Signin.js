import React, { useContext, useState } from "react";
import { putSignIn } from "../fetcher";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

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

  const { user, setUser } = useContext(UserContext);

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
      const responseObject = await putSignIn(form);

      if (responseObject.data.getUserDto) {
        localStorage.setItem(
          "user",
          JSON.stringify(responseObject.data.getUserDto)
        );
        setUser(JSON.parse(localStorage.getItem("user")));
        navigate("/loggedin");
      } else {
        setErrorMessage(responseObject.data.message);
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
    <>
      {user && (
        <div className="login-container" style={{ gridTemplateRows: "1fr" }}>
          <h3>You're already signed in.</h3>
        </div>
      )}

      {!user && (
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

          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}

          <div className="btn-right">
            <button onClick={handleSignin}>Sign in</button>
          </div>
        </form>
      )}
    </>
  );
};

export default Signin;
