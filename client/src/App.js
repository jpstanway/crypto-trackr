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

import { ALL_CRYPTOS } from "./graphql/queries";
import { initializeCryptos } from "./redux/reducers/cryptoReducer";

const App = props => {
  const cryptos = useQuery(ALL_CRYPTOS);

  if (cryptos.loading) {
    return <div>loading...</div>;
  } else {
    props.initializeCryptos(cryptos.data.allCryptos);
  }

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/currency/:id" component={Crypto} />
      </div>
      <Footer />
    </Router>
  );
};

export default connect(
  null,
  { initializeCryptos }
)(App);
