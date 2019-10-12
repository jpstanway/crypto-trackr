require("dotenv").config({ path: "./config.env" });

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

// env variables
const mongodbUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), jwtSecret);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
