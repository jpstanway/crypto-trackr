import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import { Like } from "./Like";

test("clicking like button calls event handler", () => {
  const mockHandler = jest.fn();
  const cryptos = { cryptoData: [] };
  const crypto = [
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
    <Like crypto={crypto} addLike={mockHandler} cryptos={cryptos} />
  );
  const button = component.container.getElementsByClassName("btn-like");

  fireEvent.click(button[0]);

  expect(mockHandler.mock.calls.length).toBe(1);
});
