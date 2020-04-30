import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { firstCryptos } from "../../redux/reducers/cryptoReducer";

const Navigation = ({ firstCryptos }) => (
  <nav id="nav" className="navigation">
    <ul className="navigation__menu">
      <li className="navigation__item">
        <Link
          to="/"
          onClick={() => firstCryptos()}
          className="navigation__link"
        >
          Crypto Trackr
        </Link>
      </li>
    </ul>
  </nav>
);

export default connect(null, { firstCryptos })(Navigation);
