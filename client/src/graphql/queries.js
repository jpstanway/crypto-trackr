import { gql } from "apollo-boost";

export const ALL_CRYPTOS = gql`
  query {
    allCryptos {
      id
      currency
      rank
      name
      logo_url
      market_cap
      price
      price_date
      circulating_supply
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
  }
`;

export const GET_CRYPTO_METADATA = gql`
  query cryptoMetadata($currency: String!) {
    getCryptoMetaData(currency: $currency) {
      website_url
      reddit_url
      whitepaper_url
    }
  }
`;

export const GET_SAVED_CRYPTO_DATA = gql`
  query {
    getCryptoData {
      id
      currency
      name
      rank
      logo_url
      market_cap
      price
      circulating_supply
      likes
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
  }
`;
