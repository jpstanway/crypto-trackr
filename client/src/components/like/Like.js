import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setUserLikedCryptos } from "../../redux/reducers/cryptoReducer";

import localStorageHandler from "../../utils/localStorageHandler";

export const Like = ({ addLike, crypto, cryptos, setUserLikedCryptos }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (cryptos.userLikedCryptos.indexOf(crypto.currency) > -1) {
      setLiked(true);
    }
  }, [crypto, cryptos]);

  const handleLikes = async ({ currency, name }) => {
    // fire addLike mutation
    await addLike({
      variables: {
        currency,
        name,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addLike: {
          __typename: "Crypto",
          currency,
          name,
          likes: [...crypto.likes, "tempIp"],
        },
      },
    });

    // add to users liked cryptos in localstorage
    const likedCryptos = localStorageHandler(currency);
    setUserLikedCryptos(likedCryptos);
  };

  const renderLikes = (currency) => {
    const crypto = cryptos.cryptoData.find(
      (crypto) => crypto.currency === currency
    );

    return crypto ? crypto.likes.length : 0;
  };

  return (
    <div className="btn-group">
      <button
        onClick={() => handleLikes(crypto)}
        className={`btn btn-like ${liked ? "btn-like--liked" : ""}`}
        disabled={liked}
      >
        <i className="fas fa-caret-up fa-2x"></i>
      </button>
      <span className="btn-group__value">{renderLikes(crypto.currency)}</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cryptos: state.cryptos,
});

export default connect(mapStateToProps, { setUserLikedCryptos })(Like);
