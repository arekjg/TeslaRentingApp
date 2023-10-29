import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav-bar">
      <div className="column left">
        <Link to="/">TESLA</Link>
      </div>

      <div className="column middle"></div>

      <div className="column right"></div>
    </div>
  );
};

export default Navigation;
