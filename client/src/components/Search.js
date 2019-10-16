import React from "react";

const Search = () => (
  <main className="content">
    <div className="add-search-content">
      <h1 className="heading-1">Add/Search Cryptocurrencies</h1>
      <div className="search-box">
        <form action="" className="search-box__search">
          <input
            type="text"
            className="search-box__input"
            placeholder="Search cryptocurrencies..."
          />
          <button className="search-box__btn">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="search-results">
        <div className="crypto-card">
          <div className="crypto-card__header">
            <h2 className="crypto-card__name">Bitcoin</h2>
            <input
              type="checkbox"
              id="add-crypto"
              className="crypto-card__checkbox"
            />
            <label htmlFor="add-crypto" className="crypto-card__add">
              <i className="fas fa-plus fa-2x crypto-card__icon"></i>
              <i className="fas fa-check fa-2x crypto-card__icon--check"></i>
            </label>
          </div>
          <ul className="crypto-card__info">
            <li className="crypto-card__item">
              <strong>Rank: </strong>1
            </li>
            <li className="crypto-card__item">
              <strong>Symbol: </strong>BTC
            </li>
            <li className="crypto-card__item">
              <strong>Price: </strong>$10,143.18
            </li>
            <li className="crypto-card__item">
              <strong>Market cap: </strong>$180,893,681,908
            </li>
            <li className="crypto-card__item">
              <strong>Volume: </strong>$17,657,052,903
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
);

export default Search;
