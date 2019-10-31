import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { connect } from "react-redux";

import "./App.css";

import Home from "./components/Home";
import Crypto from "./components/Crypto";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import { ALL_CRYPTOS, GET_SAVED_CRYPTO_DATA } from "./graphql/queries";
import {
  updateCryptoData,
  initializeSavedData,
  toggleLoading
} from "./redux/reducers/cryptoReducer";

import halfCircleIcon from "./styles/imgs/Animated_loading_half-circle.gif";

const App = props => {
  const { data } = useQuery(ALL_CRYPTOS, {
    onCompleted: data => {
      props.updateCryptoData(data.allCryptos);
      props.toggleLoading();
    }
  });
  const savedData = useQuery(GET_SAVED_CRYPTO_DATA);

  if (savedData.loading) {
    return (
      <div className="loading-icon">
        <img src={halfCircleIcon} alt="loading icon" />
      </div>
    );
  }

  props.initializeSavedData(savedData.data.getCryptoData);

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route exact path="/" render={() => <Home data={data} />} />
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
  { initializeSavedData, updateCryptoData, toggleLoading }
)(App);
