import React from "react";

const Search = ({ search, setSearch }) => (
  <div className="search-box">
    <form action="" className="search-box__search">
      <input
        type="text"
        className="search-box__input"
        placeholder="Search cryptocurrencies..."
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
    </form>
  </div>
);

export default Search;
