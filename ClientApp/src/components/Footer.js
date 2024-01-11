import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div id="gh-icon">
        <a
          href="https://github.com/arekjg/TeslaRentingApp"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="../images/GithubIcon.svg"
            className="svg-icon"
            alt=""
            id="gh-icon"
          />
        </a>
      </div>
      <div id="footer-center">
        <Link to="/">Home</Link> | <Link to="/locations">Locations</Link>
      </div>
    </div>
  );
};

export default Footer;
