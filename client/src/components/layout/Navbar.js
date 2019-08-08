import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../utils/dropdown";

class Navbar extends Component {
  render() {
    return (
      <nav className="navigation">
        <ul className="navigation__menu">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/add-search" className="navigation__link">
              Add/search
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/my-portfolio" className="navigation__link">
              My portfolio
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/login-signup" className="navigation__link">
              Login/Sign Up
            </Link>
          </li>
        </ul>

        <div className="mobile navigation__mobile-nav">
          <ul className="navigation__mobile-nav-menu">
            <li className="navigation__mobile-nav-item">
              <Link to="/" className="navigation__mobile-nav-link">
                Home
              </Link>
            </li>
            <li className="navigation__mobile-nav-item">
              <Link to="/add-search" className="navigation__mobile-nav-link">
                Add/Search
              </Link>
            </li>
            <li className="navigation__mobile-nav-item">
              <Link to="/my-portfolio" className="navigation__mobile-nav-link">
                My Portfolio
              </Link>
            </li>
            <li className="navigation__mobile-nav-item">
              <Link to="/login-signup" className="navigation__mobile-nav-link">
                Login/Sign Up
              </Link>
            </li>
          </ul>
        </div>
        <a href="#" className="mobile navigation__mobile-btn">
          <div className="navigation__mobile-btn-box">
            <span className="navigation__mobile-btn-bar" />
          </div>
        </a>
      </nav>
    );
  }
}

export default Navbar;
