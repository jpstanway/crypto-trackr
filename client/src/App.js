import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { connect } from "react-redux";

import "./App.css";

import Home from "./components/home/Home";
import Crypto from "./components/crypto/Crypto";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";

import Loading from "./components/loading/Loading";

import { ALL_CRYPTOS, GET_SAVED_CRYPTO_DATA } from "./graphql/queries";
import {
  initializeCryptoData,
  updateCryptoData,
  toggleLoading,
} from "./redux/reducers/cryptoReducer";

const App = (props) => {
  useQuery(ALL_CRYPTOS, {
    onCompleted: (data) => {
      props.updateCryptoData(data.allCryptos);
      props.toggleLoading();
    },
  });

  const savedData = useQuery(GET_SAVED_CRYPTO_DATA);

  if (savedData.loading) {
    return <Loading />;
  }

  props.initializeCryptoData(savedData.data.getCryptoData);

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route exact path="/" render={() => <Home />} />
        <Route path="/currency/:id" render={(props) => <Crypto {...props} />} />
      </div>
      <Footer />
    </Router>
  );
};

export default connect(null, {
  initializeCryptoData,
  updateCryptoData,
  toggleLoading,
})(App);
