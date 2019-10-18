import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import convertToCurrency from "../utils/convertToCurrency";

const Home = props => {
  const [filter, setFilter] = useState({ min: 1, max: 10 });

  const handlePrev = () => {
    const prevFilter = {
      min: filter.min - 10,
      max: filter.max - 10
    };

    setFilter(prevFilter);
  };

  const handleNext = () => {
    const nextFilter = {
      min: filter.min + 10,
      max: filter.max + 10
    };

    setFilter(nextFilter);
  };

  return (
    <main className="content">
      <div className="home-content">
        <h1 className="home-content__title heading-1">
          Current Top 10 Cryptocurrencies
        </h1>
        <p style={{ textAlign: "center" }}>
          <em>updated </em>
        </p>
        <div className="home-content__content">
          <table className="home-table">
            <thead className="home-table__head">
              <tr>
                <th className="home-table__heading home-table__heading--rank">
                  Rank
                </th>
                <th className="home-table__heading">Name</th>
                <th className="home-table__heading">Market Cap</th>
                <th className="home-table__heading">Price</th>
                <th className="home-table__heading">Volume</th>
              </tr>
            </thead>
            <tbody className="home-table__body">
              {props.cryptos
                .filter(
                  crypto =>
                    crypto.rank >= filter.min && crypto.rank <= filter.max
                )
                .map(crypto => (
                  <tr key={crypto.currency} className="home-table__row">
                    <td className="home-table__cell">{crypto.rank}</td>
                    <td className="home-table__cell home-table__cell--name">
                      <img
                        src={crypto.logo_url}
                        alt={crypto.name}
                        className="home-table__logo"
                      />
                      <Link to={`/currency/${crypto.currency}`}>
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
                      {convertToCurrency(crypto.circulating_supply, true)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="home-btns">
            <button
              onClick={handlePrev}
              className={`btn btn-large ${
                filter.min === 1 ? "btn-disabled" : ""
              }`}
              disabled={filter.min === 1}
            >
              prev 10
            </button>
            <button onClick={handleNext} className="btn btn-large">
              next 10
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(mapStateToProps)(Home);
