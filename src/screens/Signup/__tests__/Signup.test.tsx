/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import Signup from "../Signup";
import { act, fireEvent, render, screen } from "@src/test-utils";

jest.mock("@hooks/useAuth", () => ({
  useAuth: jest.fn().mockReturnValue({
    signUp: () => ({}),
  }),
}));
jest.mock("react-native-toast-message/lib/src/Toast", () => jest.fn());
jest.mock("react-native-dropdown-picker", () => ({ placeholder }: any) => {
  const React = require("react");
  const { Text, View } = require("react-native");
  return (
    <View>
      <Text>{placeholder}</Text>
    </View>
  );
});

describe("SignUp", () => {
  describe("Test Steps", () => {
    it("should have four steps", () => {
      render(<Signup />);
      expect(screen.getAllByTestId("step")).toHaveLength(3);
    });
    it("should advance steps", async () => {
      render(<Signup />);
      const advanceButton = screen.getByText(/Avançar/);
      const [step1] = screen.getAllByTestId("step-circle");
      expect(step1).toHaveProp("status", "progress");
      await act(() => {
        fireEvent.press(advanceButton);
      });
      expect(step1).toHaveProp("status", "progress");
    });
  });
});
