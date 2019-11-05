import React from "react";
import { connect } from "react-redux";

export const Like = ({ addLike, crypto, cryptos }) => {
  const handleLikes = async ({ currency, name }) => {
    await addLike({
      variables: {
        currency,
        name
      }
    });
  };

  const renderLikes = currency => {
    const crypto = cryptos.cryptoData.find(
      crypto => crypto.currency === currency
    );

    return crypto ? crypto.likes.length : 0;
  };

  return (
    <div className="btn-group">
      <button onClick={() => handleLikes(crypto)} className="btn btn-like">
        <i className="fas fa-caret-up fa-2x"></i>
      </button>
      <span className="btn-group__value">{renderLikes(crypto.currency)}</span>
    </div>
  );
};

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(mapStateToProps)(Like);
