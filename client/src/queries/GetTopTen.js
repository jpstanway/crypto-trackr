import { gql } from "apollo-boost";

export default gql`
  query {
    cryptos {
      id
      rank
      name
      market_cap
      price
      circulating_supply
      logo_url
      currency
    }
  }
`;
