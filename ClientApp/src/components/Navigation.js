import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div>Tesla Renting System</div>
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        <Link to="/models">Models</Link>
      </div>
    </>
  );
};

export default Navigation;
