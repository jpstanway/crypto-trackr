import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import { Buttons } from "./Buttons";

describe("<Buttons />", () => {
  let component;
  const mockPrevHandler = jest.fn();
  const mockNextHandler = jest.fn();
  const cryptos = {
    filter: { min: 0, max: 10 },
    cryptoData: []
  };

  beforeEach(() => {
    component = render(
      <Buttons
        cryptos={cryptos}
        previousCryptos={mockPrevHandler}
        nextCryptos={mockNextHandler}
      />
    );
  });

  test("button components are rendered", () => {
    expect(component.container).toHaveTextContent("next 10");
    expect(component.container).toHaveTextContent("prev 10");
  });

  test("next button event handler is fired", () => {
    const nextButton = component.getByText("next 10");
    fireEvent.click(nextButton);

    expect(mockNextHandler.mock.calls.length).toBe(1);
  });

  test("prev button is disabled on initial render", () => {
    const prevButton = component.getByText("prev 10");
    fireEvent.click(prevButton);

    expect(mockPrevHandler.mock.calls.length).toBe(0);
  });
});
