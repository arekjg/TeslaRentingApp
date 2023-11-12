import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="reservation-container">
      <h3>Thank you for your reservation!</h3>

      <div className="btn-right">
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default Confirmation;
