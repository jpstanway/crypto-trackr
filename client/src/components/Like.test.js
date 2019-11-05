import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import Like from "./Like";

test("clicking like button calls event handler", () => {
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

  const mockHandler = jest.fn();

  const { getByTestId } = render(
    <Provider store={store}>
      <Like crypto={crypto} addLike={mockHandler} />
    </Provider>
  );

  const button = getByTestId("like");
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(1);
});
