import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// components
//import requireAuth from "./components/auth/requireAuth";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import AddSearch from "./components/pages/AddSearch";
import MyPortfolio from "./components/pages/MyPortfolio";
import LoginSignUp from "./components/pages/LoginSignUp";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <div className="container">
          <main className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/add-search" component={AddSearch} />
            <Route exact path="/my-portfolio" component={MyPortfolio} />
            <Route exact path="/login-signup" component={LoginSignUp} />
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
