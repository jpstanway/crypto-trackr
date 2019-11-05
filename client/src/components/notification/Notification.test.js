import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { Notification } from "./Notification";

describe("<Notification />", () => {
  test("component does not render by default", () => {
    const component = render(<Notification />);

    const notification = component.container.getElementsByClassName(
      "notification"
    );

    expect(notification[0]).toHaveStyle("display: none;");
  });

  test("component renders when passed a string argument", () => {
    const component = render(<Notification notification="Test successful" />);

    expect(component.container).toHaveTextContent("Test successful");
  });
});
