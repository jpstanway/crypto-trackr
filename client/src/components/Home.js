import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import { ADD_OR_UPDATE_CRYPTOS } from "../graphql/mutations";
import { toggleSort } from "../redux/reducers/cryptoReducer";

import Notification from "./Notification";
import Search from "./Search";
import TableData from "./TableData";
import Buttons from "./Buttons";

import halfCircleIcon from "../styles/imgs/Animated_loading_half-circle.gif";

const Home = ({ cryptos, toggleSort }) => {
  const [search, setSearch] = useState("");
  const [cryptosToShow, setCryptosToShow] = useState([]);
  const [addOrUpdateCryptos] = useMutation(ADD_OR_UPDATE_CRYPTOS);

  useEffect(() => {
    if (cryptos.loading) {
      // while api data is loading, render first 10 saved cryptos from database
      setCryptosToShow(
        cryptos.cryptoData
          .filter(crypto => crypto.rank >= 1 && crypto.rank <= 10)
          .sort((a, b) => a.rank - b.rank)
      );
    } else {
      // after loading completes, render api data
      setCryptosToShow(
        cryptos.cryptoData.filter((crypto, index) => {
          if (search) {
            return crypto.name.toLowerCase().includes(search.toLowerCase());
          }

          return index >= cryptos.filter.min && index <= cryptos.filter.max;
        })
      );

      // update first 10 cryptos in database
      const cryptosToSave = cryptos.cryptoData
        .filter(crypto => crypto.rank <= 10)
        .map(crypto => {
          const { id, __typename, price_date, likes, ...otherProps } = crypto;
          return otherProps;
        });

      addOrUpdateCryptos({ variables: { cryptosToSave } });
    }
  }, [cryptos, search, addOrUpdateCryptos]);

  const handleSort = val => {
    let data;
    if (val === "likes") {
      data = cryptos.cryptoData.sort((a, b) => b.likes.length - a.likes.length);
    } else {
      data = cryptos.cryptoData.sort((a, b) => a.rank - b.rank);
    }
    toggleSort(data);
  };

  return (
    <main className="content">
      <div className="home-content">
        <Notification />
        <Search search={search} setSearch={setSearch} />
        <h1 className="home-content__title heading-1">
          Current Top 10 Cryptocurrencies
        </h1>
        <div className="home-content__updating">
          {cryptos.loading ? (
            <p>
              <img
                className="home-content__update-icon"
                src={halfCircleIcon}
                alt="updating icon"
              />
              <em> updating...</em>
            </p>
          ) : (
            <em>updated {cryptos.cryptoData[0].price_date}</em>
          )}
        </div>
        <div className="home-content__sort">
          Sort by:
          <div className="home-content__selector">
            <input
              type="radio"
              id="rank"
              name="sort"
              value="rank"
              onChange={({ target }) => handleSort(target.value)}
              checked={cryptos.sortByRank}
            />
            <label htmlFor="rank">
              <em>rank</em>
            </label>
          </div>
          <div className="home-content__selector">
            <input
              type="radio"
              id="likes"
              name="sort"
              value="likes"
              onChange={({ target }) => handleSort(target.value)}
              checked={!cryptos.sortByRank}
            />
            <label htmlFor="likes">
              <em>likes</em>
            </label>
          </div>
        </div>
        <div className="home-content__content">
          <TableData cryptosToShow={cryptosToShow} />
          {cryptos.loading ? null : <Buttons />}
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(
  mapStateToProps,
  { toggleSort }
)(Home);
