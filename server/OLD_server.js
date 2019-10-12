require("dotenv").config({ path: "./server/config.env" });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");

require("./models");
require("./services/auth");

const schema = require("./schema/schema");
const mongoURI = process.env.MONGO_URI;
mongoose.Promise = global.Promise;

// MongoDB connection
mongoose.connect(mongoURI, {
  authSource: "admin",
  retryWrites: true,
  dbName: "CryptoPortfolioBuilder",
  useCreateIndex: true,
  useNewUrlParser: true
});

const db = mongoose.connection
  .on("error", error =>
    console.log("Error connection to MongoDB cloud: ", error)
  )
  .once("open", () => console.log("Successfully connected to MongoDB!"));

// CORS
app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Passport
app.use(passport.initialize());
app.use(passport.session());

// mount graphql instance on path of same name
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// Server set up
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}!`
  );
});
