import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import { ADD_OR_UPDATE_CRYPTOS } from "../graphql/mutations";

import Notification from "./notification/Notification";
import Search from "./search/Search";
import TableData from "./table-data/TableData";
import Buttons from "./buttons/Buttons";
import Sort from "./sort/Sort";

import halfCircleIcon from "../styles/imgs/Animated_loading_half-circle.gif";

const Home = ({ cryptos }) => {
  const [search, setSearch] = useState("");
  const [cryptosToShow, setCryptosToShow] = useState([]);
  const [addOrUpdateCryptos] = useMutation(ADD_OR_UPDATE_CRYPTOS);

  useEffect(() => {
    if (cryptos.loading) {
      // while api data is loading, render first 50 saved cryptos from database
      setCryptosToShow(
        cryptos.cryptoData
          .filter(crypto => crypto.rank >= 1 && crypto.rank <= 50)
          .sort((a, b) => a.rank - b.rank)
      );
    } else {
      // after loading completes, render api data
      setCryptosToShow(
        cryptos.cryptoData.filter((crypto, index) => {
          if (search) {
            return (
              crypto.name
                .toLowerCase()
                .startsWith(search.toLowerCase().substr(0, 1)) &&
              crypto.name.toLowerCase().includes(search.toLowerCase())
            );
          }

          return index >= cryptos.filter.min && index <= cryptos.filter.max;
        })
      );

      // update first 50 cryptos in database
      const cryptosToSave = cryptos.cryptoData
        .filter(crypto => crypto.rank <= 50)
        .map(crypto => {
          const { id, __typename, price_date, likes, ...otherProps } = crypto;
          return otherProps;
        });

      addOrUpdateCryptos({ variables: { cryptosToSave } });
    }
  }, [cryptos, search, addOrUpdateCryptos]);

  return (
    <main id="content" className="content">
      <div className="home-content">
        <Notification />
        <Search search={search} setSearch={setSearch} />
        <h1 className="home-content__title heading-1">
          Current Top Cryptocurrencies
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
            <em>
              updated{" "}
              {new Date(cryptos.cryptoData[0].price_date).toLocaleDateString(
                "en-US"
              )}
            </em>
          )}
        </div>
        <Sort />
        <div className="home-content__content">
          <TableData cryptosToShow={cryptosToShow} />
          {cryptos.loading || search ? null : <Buttons />}
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(mapStateToProps)(Home);
