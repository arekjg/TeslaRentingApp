import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav-bar">
      <div className="column head-left">
        <Link to="/">
          <img src={"../images/tesla_logo_400x400.png"} alt="logo" />
        </Link>
      </div>

      <div className="column head-center">
        <Link to="/">
          <img src={"../images/tesla_logo_400x60.png"} alt="logo2" />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
