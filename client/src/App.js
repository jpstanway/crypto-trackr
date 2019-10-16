import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Search from "./components/Search";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <Navigation />
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
    </div>
    <Footer />
  </Router>
);

export default App;
