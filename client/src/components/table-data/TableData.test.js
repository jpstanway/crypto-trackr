import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { TableData } from "./TableData";

test("render home component with table data", () => {
  const cryptos = { loading: true };
  const cryptosToShow = [
    {
      currency: "BTC",
      price: "9228.57",
      circulating_supply: "18027887",
      name: "Bitcoin",
      logo_url:
        "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
      market_cap: "166371542818",
      rank: "1"
    }
  ];

  const component = render(
    <Router>
      <TableData cryptosToShow={cryptosToShow} cryptos={cryptos} />
    </Router>
  );

  expect(component.container).toHaveTextContent("Bitcoin");
});
