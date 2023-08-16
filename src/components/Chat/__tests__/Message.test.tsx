import { render, screen } from "@src/test-utils";
import { Message } from "../Message";
import React from "react";
import { light } from "@src/styles/themes/light";

describe("Message component", () => {
  const message = "Olá, mundo";
  it("should use current user style", () => {
    render(<Message isCurrentUser message={message} />);
    const component = screen.getByTestId("message");
    expect(screen.getByText(message)).toBeOnTheScreen();
    const style = component.props.style[0];
    expect(style.backgroundColor).toBe(light.colors.lightPrimary);
    expect(style.marginLeft).toBe("auto");
  });
  it("should use other user style", () => {
    render(<Message message={message} />);
    const component = screen.getByTestId("message");
    expect(screen.getByText(message)).toBeOnTheScreen();
    const style = component.props.style[0];
    expect(style.backgroundColor).toBe(light.colors.lightSecondary);
    expect(style.marginRight).toBe("auto");
  });
});
