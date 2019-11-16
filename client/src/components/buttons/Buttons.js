import React from "react";
import { connect } from "react-redux";

import {
  previousCryptos,
  nextCryptos
} from "../../redux/reducers/cryptoReducer";

import ViewAllButton from "./ViewAllButton";

export const Buttons = ({ cryptos, previousCryptos, nextCryptos }) => (
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
    <ViewAllButton />
  </div>
);

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(mapStateToProps, { previousCryptos, nextCryptos })(
  Buttons
);
