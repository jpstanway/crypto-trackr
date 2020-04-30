import React from "react";
import { connect } from "react-redux";

import {
  previousCryptos,
  nextCryptos,
  firstCryptos,
  lastCryptos,
} from "../../redux/reducers/cryptoReducer";

import LargeButton from "./LargeButton";
import LinkButton from "./LinkButton";

export const Buttons = ({
  cryptos,
  previousCryptos,
  nextCryptos,
  firstCryptos,
  lastCryptos,
}) => {
  const firstBtnText = (
    <>
      <i className="fas fa-arrow-left"></i>
      <span> first</span>
    </>
  );
  const lastBtnText = (
    <>
      <span>last </span>
      <i className="fas fa-arrow-right"></i>
    </>
  );

  return (
    <div>
      {cryptos.filter.viewAll ? (
        ""
      ) : (
        <div className="home-btns">
          <LinkButton text={firstBtnText} onClick={() => firstCryptos()} />
          <LargeButton
            text="prev 50"
            onClick={() => previousCryptos()}
            disabled={cryptos.filter.min === 0}
          />
          <LargeButton
            text="next 50"
            onClick={() => nextCryptos()}
            disabled={cryptos.filter.max === cryptos.cryptoData.length - 1}
          />
          <LinkButton text={lastBtnText} onClick={() => lastCryptos()} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cryptos: state.cryptos,
});

export default connect(mapStateToProps, {
  previousCryptos,
  nextCryptos,
  firstCryptos,
  lastCryptos,
})(Buttons);
