const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const app = express();

// security
app.use(cors());
app.use(helmet());

// env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
}

let mongodbUri = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  mongodbUri = process.env.TEST_MONGODB_URI;
}

// graphql
const typeDefs = require("./graphql-schema/types");
const resolvers = require("./graphql-schema/resolvers");

// MongoDB connection
mongoose
  .connect(mongodbUri, { useNewUrlParser: true })
  .then(() => console.log("***--- Successfully connected to MongoDB ---***"))
  .catch(err => console.log("!!! Error connecting to MongoDB !!!", err));

// server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: context => ({
    ...context,
    userIp: () => {
      const headers = context.req.headers;
      if (!headers) return null;
      const ipAddress = headers["X-Forwarded-For"] || headers["origin"];
      if (!ipAddress) return null;
      return ipAddress;
    },
    apiInfo: {
      url: process.env.API_URL,
      key: process.env.API_KEY
    }
  })
});

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server ready at port ${port}`);
});
