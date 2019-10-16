import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { ALL_CRYPTOS } from "../graphql/queries";

import convertToCurrency from "../utils/convertToCurrency";

const Home = () => {
  const [filter, setFilter] = useState({ min: 1, max: 10 });
  const cryptos = useQuery(ALL_CRYPTOS);

  if (cryptos.loading) {
    return <div>loading...</div>;
  }

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
              {cryptos.data.allCryptos
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
                      {crypto.name}
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

export default Home;
