require("dotenv").config({ path: "./config.env" });

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// env variables
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
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: context => ({
    ...context,
    userIp: () => {
      const headers = context.req.headers;
      if (!headers) return null;
      const ipAddress = headers["x-forwarded-for"] || headers["origin"];
      if (!ipAddress) return null;
      return ipAddress;
    },
    apiInfo: {
      url: process.env.API_URL,
      key: process.env.API_KEY
    }
  })
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
