import React from "react";
import { connect } from "react-redux";

import { previousCryptos, nextCryptos } from "../redux/reducers/cryptoReducer";

const Buttons = ({ allCryptos, cryptos, previousCryptos, nextCryptos }) => {
  const handlePrev = () => {
    previousCryptos();
  };

  const handleNext = () => {
    nextCryptos();
  };

  return (
    <div className="home-btns">
      <button
        onClick={handlePrev}
        className={`btn btn-large ${
          cryptos.filter.min === 1 ? "btn-disabled" : ""
        }`}
        disabled={cryptos.filter.min === 1}
      >
        prev 10
      </button>
      <button
        onClick={handleNext}
        className={`btn btn-large ${
          cryptos.filter.max === allCryptos.length ? "btn-disabled" : ""
        }`}
        disabled={cryptos.filter.max === allCryptos.length}
      >
        next 10
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(
  mapStateToProps,
  { previousCryptos, nextCryptos }
)(Buttons);
