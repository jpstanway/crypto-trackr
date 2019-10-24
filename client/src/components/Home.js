import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import convertToCurrency from "../utils/convertToCurrency";

import { ADD_LIKE } from "../graphql/mutations";
import { addCrypto, updateLikes } from "../redux/reducers/likesReducer";

const Home = ({ data: { allCryptos }, likeData, addCrypto, updateLikes }) => {
  const [filter, setFilter] = useState({ min: 1, max: 10 });
  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: data => {
      // check if crypto exists in store before attempting to update
      if (!likeData.find(crypto => crypto.currency === data.addLike.currency)) {
        // add new if it does not
        addCrypto(data.addLike);
      }
      // update likes if it does
      updateLikes(data.addLike);
    },
    onError: error => {
      console.error(error);
      window.alert("You have already liked this crypto!");
    }
  });

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

  const handleLikes = async ({ currency, name }) => {
    await addLike({
      variables: {
        currency,
        name
      }
    });
  };

  const renderLikes = currency => {
    const crypto = likeData.find(crypto => crypto.currency === currency);

    return crypto ? crypto.likes.length : 0;
  };

  return (
    <main className="content">
      <div className="home-content">
        <h1 className="home-content__title heading-1">
          Current Top 10 Cryptocurrencies
        </h1>
        <p style={{ textAlign: "center" }}>
          <em>updated {allCryptos[0].price_date}</em>
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
                <th className="home-table__heading">&nbsp;</th>
              </tr>
            </thead>
            <tbody className="home-table__body">
              {allCryptos
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
                      <Link
                        className="home-table__link"
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
                      {convertToCurrency(crypto.circulating_supply, true)}
                    </td>
                    <td className="home-table__cell">
                      <div className="btn-group">
                        <button
                          onClick={() => handleLikes(crypto)}
                          className="btn btn-like"
                        >
                          <i className="fas fa-caret-up fa-2x"></i>
                        </button>
                        <span className="btn-group__value">
                          {renderLikes(crypto.currency)}
                        </span>
                      </div>
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
  likeData: state.likes
});

export default connect(
  mapStateToProps,
  { addCrypto, updateLikes }
)(Home);
