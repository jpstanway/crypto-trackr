require("dotenv").config({ path: "./config.env" });

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// env variables
const mongodbUri = process.env.MONGODB_URI;

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
      const ipAddress = headers["x-forwarded-for"];
      if (!ipAddress) return null;
      return ipAddress;
    }
  })
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
