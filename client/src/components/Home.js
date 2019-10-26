import React, { useState, useEffect } from "react";

import Notification from "./Notification";
import Search from "./Search";
import TableData from "./TableData";
import Buttons from "./Buttons";

const Home = ({ data: { allCryptos } }) => {
  const [filter, setFilter] = useState({ min: 1, max: 10 });
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [cryptosToShow, setCryptosToShow] = useState([]);

  useEffect(() => {
    setCryptosToShow(
      allCryptos.filter(crypto => {
        if (search) {
          return crypto.name.toLowerCase().includes(search.toLowerCase());
        }

        return crypto.rank >= filter.min && crypto.rank <= filter.max;
      })
    );
  }, [allCryptos, search, filter]);

  return (
    <main className="content">
      <div className="home-content">
        <Notification notification={notification} />
        <Search search={search} setSearch={setSearch} />
        <h1 className="home-content__title heading-1">
          Current Top 10 Cryptocurrencies
        </h1>
        <p style={{ textAlign: "center" }}>
          <em>updated {allCryptos[0].price_date}</em>
        </p>
        <div className="home-content__content">
          <TableData
            cryptosToShow={cryptosToShow}
            setNotification={setNotification}
          />
          <Buttons
            filter={filter}
            setFilter={setFilter}
            allCryptos={allCryptos}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
