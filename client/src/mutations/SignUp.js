import { gql } from "apollo-boost";

export default gql`
  mutation SignUp($email: String!, $password: String!, $password2: String!) {
    signup(email: $email, password: $password, password2: $password2) {
      id
      email
    }
  }
`;
