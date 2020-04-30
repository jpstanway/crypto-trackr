import { gql } from "apollo-boost";

export const Data = gql`
  fragment CryptoData on Crypto {
    id
    currency
    rank
    name
    logo_url
    market_cap
    price
    price_date
    circulating_supply
  }
`;

export const Trends = gql`
  fragment CryptoTrend on Crypto {
    daily {
      price_change
      price_change_pct
    }
    weekly {
      price_change
      price_change_pct
    }
    monthly {
      price_change
      price_change_pct
    }
    yearly {
      price_change
      price_change_pct
    }
    ytd {
      price_change
      price_change_pct
    }
  }
`;
