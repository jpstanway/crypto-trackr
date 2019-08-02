const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.body;
      }
    }
  }
});

module.exports = RootQueryType;
