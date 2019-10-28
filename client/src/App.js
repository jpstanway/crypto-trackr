import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { connect } from "react-redux";

import "./App.css";

import Home from "./components/Home";
import Search from "./components/Search";
import Crypto from "./components/Crypto";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import { ALL_CRYPTOS, GET_SAVED_CRYPTO_DATA } from "./graphql/queries";
import { initializeSavedData } from "./redux/reducers/cryptoReducer";

const App = props => {
  const { data, loading } = useQuery(ALL_CRYPTOS);
  const savedData = useQuery(GET_SAVED_CRYPTO_DATA);

  if (savedData.loading) {
    return <div>loading...</div>;
  }

  props.initializeSavedData(savedData.data.getCryptoData);

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route
          exact
          path="/"
          render={() => <Home data={data} loading={loading} />}
        />
        <Route path="/search" render={() => <Search data={data} />} />
        <Route
          path="/currency/:id"
          render={props => <Crypto {...props} data={data} />}
        />
      </div>
      <Footer />
    </Router>
  );
};

export default connect(
  null,
  { initializeSavedData }
)(App);
