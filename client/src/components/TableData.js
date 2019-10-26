import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";

import Like from "./Like";

import convertToCurrency from "../utils/convertToCurrency";
import { ADD_LIKE } from "../graphql/mutations";
import { addCrypto, updateLikes } from "../redux/reducers/likesReducer";

const TableData = ({
  cryptosToShow,
  setNotification,
  likeData,
  addCrypto,
  updateLikes
}) => {
  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: data => {
      // check if crypto exists in store before attempting to update
      if (!likeData.find(crypto => crypto.currency === data.addLike.currency)) {
        // add new if it does not
        addCrypto(data.addLike);
      }
      // update likes if it does
      updateLikes(data.addLike);
    },
    onError: error => {
      console.error(error);
      setNotification("You have already liked this crypto!");

      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  });

  return cryptosToShow.length === 0 ? (
    <div>
      <h4 className="heading-3">No cryptos found</h4>
    </div>
  ) : (
    <table className="home-table">
      <thead className="home-table__head">
        <tr>
          <th className="home-table__heading home-table__heading--rank">
            Rank
          </th>
          <th className="home-table__heading">Name</th>
          <th className="home-table__heading">Market Cap</th>
          <th className="home-table__heading">Price</th>
          <th className="home-table__heading">Volume</th>
          <th className="home-table__heading">&nbsp;</th>
        </tr>
      </thead>
      <tbody className="home-table__body">
        {cryptosToShow.map(crypto => (
          <tr key={crypto.currency} className="home-table__row">
            <td className="home-table__cell">{crypto.rank}</td>
            <td className="home-table__cell home-table__cell--name">
              <img
                src={crypto.logo_url}
                alt={crypto.name}
                className="home-table__logo"
              />
              <Link
                className="home-table__link"
                to={`/currency/${crypto.currency}`}
              >
                {crypto.name}
              </Link>
            </td>
            <td className="home-table__cell">
              {convertToCurrency(crypto.market_cap, true)}
            </td>
            <td className="home-table__cell">
              {convertToCurrency(crypto.price, true)}
            </td>
            <td className="home-table__cell">
              {convertToCurrency(crypto.circulating_supply, true)}
            </td>
            <td className="home-table__cell">
              <Like crypto={crypto} addLike={addLike} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  likeData: state.likes
});

export default connect(
  mapStateToProps,
  { addCrypto, updateLikes }
)(TableData);
