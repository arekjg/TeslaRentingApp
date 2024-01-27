import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Confirmation = ({ type }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  let header;
  let message;

  if (type === "reservation") {
    header = "Thank you for your reservation!";
  } else if (type === "registration") {
    header = "You successfully created an account";
    message = "You can return to home page or sign in";
  } else if (type === "loggedin") {
    header = `Hello again ${user.firstName}!`;
    message = "You can now manage your reservations and account settings.";
  }

  return (
    <div className="reservation-container">
      {header && <h3>{header}</h3>}
      {message && <p>{message}</p>}
      <div className="btn-right">
        <button onClick={() => navigate("/")}>Home</button>
        {type === "registration" && (
          <button onClick={() => navigate("/signin")}>Sign in</button>
        )}
        {type === "loggedin" && (
          <>
            <button onClick={() => navigate("/settings")}>Settings</button>
            <button onClick={() => navigate("/reservations")}>
              Reservations
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
