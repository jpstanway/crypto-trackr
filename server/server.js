const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const mongoURI = require("./config/keys").mongoURI;

app.get("/", (req, res) => res.send("Hellooooooo"));

// MongoDB connection
mongoose.connect(mongoURI, {
  dbName: "CryptoPortfolioBuilder",
  useCreateIndex: true,
  useNewUrlParser: true
});

const db = mongoose.connection
  .on("error", error =>
    console.log("Error connection to MongoDB cloud: ", error)
  )
  .once("open", () => console.log("Successfully connected to MongoDB!"));

// Express Session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "abc123",
    store: new MongoStore({
      mongooseConnection: db,
      autoReconnect: true
    })
  })
);

// mount graphql instance on path of same name
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
