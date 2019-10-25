import React from "react";
import { Link } from "react-router-dom";
import "../utils/dropdown";

const Navigation = () => (
  <nav id="nav" className="navigation">
    <ul className="navigation__menu">
      <li className="navigation__item">
        <Link to="/" className="navigation__link">
          Crypto Tracker
        </Link>
      </li>
      {/* <li className="navigation__item">
        <Link to="/search" className="navigation__link">
          Search
        </Link>
      </li> */}
    </ul>

    {/* <div className="mobile navigation__mobile-nav">
      <ul className="navigation__mobile-nav-menu">
        <li className="navigation__mobile-nav-item">
          <Link to="/" className="navigation__mobile-nav-link">
            Home
          </Link>
        </li>
        <li className="navigation__mobile-nav-item">
          <Link to="/search" className="navigation__mobile-nav-link">
            Search
          </Link>
        </li>
      </ul>
    </div>
    <a href="#nav" className="mobile navigation__mobile-btn">
      <div className="navigation__mobile-btn-box">
        <span className="navigation__mobile-btn-bar"></span>
      </div>
    </a> */}
  </nav>
);

export default Navigation;
