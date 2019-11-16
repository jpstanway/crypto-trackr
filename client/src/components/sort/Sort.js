import React from "react";
import { connect } from "react-redux";

import { toggleSort } from "../../redux/reducers/cryptoReducer";

export const Sort = ({ cryptos, toggleSort }) => {
  const handleSort = val => {
    let data;
    if (val === "likes") {
      data = cryptos.cryptoData.sort((a, b) => b.likes.length - a.likes.length);
    } else {
      data = cryptos.cryptoData.sort((a, b) => a.rank - b.rank);
    }
    toggleSort(data);
  };

  return (
    <div className="home-content__sort">
      Sort by:
      <div className="home-content__selector">
        <input
          type="radio"
          id="rank"
          name="sort"
          value="rank"
          onChange={({ target }) => handleSort(target.value)}
          checked={cryptos.sortByRank}
        />
        <label htmlFor="rank">
          <em>rank</em>
        </label>
      </div>
      <div className="home-content__selector">
        <input
          type="radio"
          id="likes"
          name="sort"
          value="likes"
          onChange={({ target }) => handleSort(target.value)}
          checked={!cryptos.sortByRank}
        />
        <label htmlFor="likes">
          <em>likes</em>
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(mapStateToProps, { toggleSort })(Sort);
