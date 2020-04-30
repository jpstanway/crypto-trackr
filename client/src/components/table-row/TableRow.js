import React from "react";
import { Link } from "react-router-dom";

import convertToCurrency from "../../utils/convertToCurrency";

const TableRow = ({ crypto, loading, children }) => (
  <tr className="home-table__row">
    <td className="home-table__cell">{crypto.rank}</td>
    <td className="home-table__cell home-table__cell--name">
      {crypto.logo_url ? (
        <img
          src={crypto.logo_url}
          alt={crypto.name}
          className="home-table__logo"
        />
      ) : (
        ""
      )}
      <Link
        className={`home-table__link ${
          loading ? "home-table__link--disabled" : ""
        }`}
        to={`/currency/${crypto.currency}`}
      >
        {crypto.name}
      </Link>
    </td>
    <td className="home-table__cell">
      {convertToCurrency(crypto.market_cap, true)}
    </td>
    <td className="home-table__cell">
      {convertToCurrency(crypto.price, true)}
    </td>
    <td className="home-table__cell">
      {convertToCurrency(crypto.circulating_supply, false)} {crypto.currency}
    </td>
    <td className="home-table__cell">{loading ? "" : { ...children }}</td>
  </tr>
);

export default TableRow;
