import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import TableData from "./TableData";
import store from "../redux/store";

test("render home component with table data", () => {
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
    <Provider store={store}>
      <Router>
        <TableData cryptosToShow={cryptosToShow} />
      </Router>
    </Provider>
  );

  expect(component.container).toHaveTextContent("Bitcoin");
});
