import { gql } from "apollo-boost";

export default gql`
  query {
    user {
      id
      email
    }
  }
`;
