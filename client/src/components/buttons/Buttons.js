import React from "react";
import { connect } from "react-redux";

import {
  previousCryptos,
  nextCryptos,
  toggleViewAll
} from "../../redux/reducers/cryptoReducer";

export const Buttons = ({
  cryptos,
  previousCryptos,
  nextCryptos,
  toggleViewAll
}) => (
  <div className="home-btns">
    {cryptos.filter.viewAll ? (
      ""
    ) : (
      <div>
        <button
          onClick={() => previousCryptos()}
          className={`btn btn-large ${
            cryptos.filter.min === 0 ? "btn-disabled" : ""
          }`}
          disabled={cryptos.filter.min === 0}
        >
          prev 50
        </button>
        <button
          onClick={() => nextCryptos()}
          className={`btn btn-large ${
            cryptos.filter.max === cryptos.cryptoData.length - 1
              ? "btn-disabled"
              : ""
          }`}
          disabled={cryptos.filter.max === cryptos.cryptoData.length - 1}
        >
          next 50
        </button>
      </div>
    )}
    <div className="btn btn-back">
      <a href="#content" onClick={() => toggleViewAll()}>
        {cryptos.filter.viewAll ? "view less" : "view all"}
      </a>
    </div>
  </div>
);

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(
  mapStateToProps,
  { previousCryptos, nextCryptos, toggleViewAll }
)(Buttons);
