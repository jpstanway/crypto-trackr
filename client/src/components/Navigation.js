import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav id="nav" className="navigation">
    <ul className="navigation__menu">
      <li className="navigation__item">
        <Link to="/" className="navigation__link">
          Crypto Tracker
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
