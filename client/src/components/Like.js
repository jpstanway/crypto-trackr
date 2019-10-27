import React from "react";
import { connect } from "react-redux";

const Like = ({ addLike, crypto, savedCryptos }) => {
  const handleLikes = async ({ currency, name }) => {
    await addLike({
      variables: {
        currency,
        name
      }
    });
  };

  const renderLikes = currency => {
    const crypto = savedCryptos.find(crypto => crypto.currency === currency);

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
  savedCryptos: state.savedCryptos
});

export default connect(mapStateToProps)(Like);
