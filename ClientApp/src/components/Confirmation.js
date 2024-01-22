import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ type }) => {
  const navigate = useNavigate();
  let header;
  let message;

  if (type === "reservation") {
    header = "Thank you for your reservation!";
  } else if (type === "registration") {
    header = "You successfully created an account";
    message = "You can return to home page or sign in";
  } else if (type === "loggedin") {
    header = "Hello again!";
    message = "You can manage your reservations now.";
  }

  return (
    <div className="reservation-container">
      {header && <h3>{header}</h3>}
      {message && <p>{message}</p>}
      <div className="btn-right">
        {type === "registration" && (
          <button onClick={() => navigate("/signin")}>Sign in</button>
        )}
        {type === "loggedin" && (
          <button onClick={() => navigate("/account")}>Account</button>
        )}
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default Confirmation;
