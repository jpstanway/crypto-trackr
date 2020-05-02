import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import { ADD_OR_UPDATE_CRYPTOS } from "../../graphql/mutations";

import {
  showMostRecentData,
  showNewData,
  getCryptosToSave,
} from "./Home.utils";

import Search from "../search/Search";
import TableData from "../table-data/TableData";
import Buttons from "../buttons/Buttons";
import Sort from "../sort/Sort";
import ViewAllButton from "../buttons/ViewAllButton";
import BackToTopButton from "../buttons/BackToTopButton";

import halfCircleIcon from "../../styles/imgs/Animated_loading_half-circle.gif";

const Home = ({ cryptos }) => {
  const [search, setSearch] = useState("");
  const [cryptosToShow, setCryptosToShow] = useState([]);
  const [addOrUpdateCryptos] = useMutation(ADD_OR_UPDATE_CRYPTOS);

  useEffect(() => {
    if (cryptos.loading) {
      // show most recent data from db
      setCryptosToShow(showMostRecentData(cryptos.cryptoData));
    } else {
      // show updated data from api
      setCryptosToShow(showNewData(cryptos, search));
      // update cryptos in db with new data
      const cryptosToSave = getCryptosToSave(cryptos.cryptoData);
      addOrUpdateCryptos({ variables: { cryptosToSave } });
    }
  }, [cryptos, search, addOrUpdateCryptos]);

  return (
    <main id="content" className="content">
      <div className="home-content">
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
        <div className="home-content__buttons--top">
          <Sort />
          {cryptos.filter.viewAll ? <ViewAllButton /> : ""}
        </div>
        <div className="home-content__content">
          <TableData cryptosToShow={cryptosToShow} />
        </div>
        <div className="home-content__buttons">
          {cryptos.loading || search ? null : (
            <>
              <Buttons />
              <ViewAllButton />
            </>
          )}
        </div>
        {cryptos.filter.viewAll ? <BackToTopButton /> : ""}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  cryptos: state.cryptos,
});

export default connect(mapStateToProps)(Home);
