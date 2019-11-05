import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import Search from "./Search";

test("fire change event when inputting text", () => {
  let search = "";
  const mockHandler = jest.fn(val => (search += val));

  const { getByTestId } = render(
    <Search search={search} setSearch={mockHandler} />
  );

  const input = getByTestId("search");
  fireEvent.change(input, { target: { value: "a" } });
  fireEvent.change(input, { target: { value: "b" } });
  fireEvent.change(input, { target: { value: "c" } });

  expect(mockHandler.mock.calls.length).toBe(3);
  expect(search).toBe("abc");
});
