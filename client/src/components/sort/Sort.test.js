import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import { Sort } from "./Sort";

describe("<Sort />", () => {
  let component;
  const mockHandler = jest.fn();
  const cryptos = { cryptoData: [], sortByRank: true };

  beforeEach(() => {
    component = render(<Sort cryptos={cryptos} toggleSort={mockHandler} />);
  });

  test("sort component successfully renders", () => {
    expect(component.container).toHaveTextContent("rank");
    expect(component.container).toHaveTextContent("likes");
  });

  test("toggle radio buttons", () => {
    const button = component.getByLabelText("likes");
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
