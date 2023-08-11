import React from "react";
import { ChannelItemIcon } from "../ChannelItemIcon";
import { screen, render } from "@src/test-utils";

describe("ChannelItemIcon component", () => {
  it("should render default icon", () => {
    render(<ChannelItemIcon typeName="other" />);
    expect(screen.getByTestId("default-icon")).toBeOnTheScreen();
  });
  it("should render jobs icon", () => {
    render(<ChannelItemIcon typeName="jobs" />);
    expect(screen.getByTestId("jobs-icon")).toBeOnTheScreen();
  });
  it("should render material icon", () => {
    render(<ChannelItemIcon typeName="material" />);
    expect(screen.getByTestId("material-icon")).toBeOnTheScreen();
  });
  it("should render doubt icon", () => {
    render(<ChannelItemIcon typeName="doubt" />);
    expect(screen.getByTestId("doubt-icon")).toBeOnTheScreen();
  });
  it("should render chat icon", () => {
    render(<ChannelItemIcon typeName="chat" />);
    expect(screen.getByTestId("chat-icon")).toBeOnTheScreen();
  });
});
