import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import "./App.css";

import Home from "./components/Home";
import Search from "./components/Search";
import Crypto from "./components/Crypto";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import { ALL_CRYPTOS } from "./graphql/queries";

const App = () => {
  const { data, loading } = useQuery(ALL_CRYPTOS);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route exact path="/" render={() => <Home data={data} />} />
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

export default App;
