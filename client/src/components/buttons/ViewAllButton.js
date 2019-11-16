import React from "react";
import { connect } from "react-redux";

import { toggleViewAll } from "../../redux/reducers/cryptoReducer";

const ViewAll = ({ cryptos, toggleViewAll }) => (
  <div className="btn btn-back">
    <a href="#content" onClick={() => toggleViewAll()}>
      {cryptos.filter.viewAll ? "view less" : "view all"}
    </a>
  </div>
);

const mapStateToProps = state => ({
  cryptos: state.cryptos
});

export default connect(mapStateToProps, { toggleViewAll })(ViewAll);
