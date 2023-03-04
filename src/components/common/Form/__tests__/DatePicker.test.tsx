import React from "react";
import { DatePicker } from "../DatePicker";
import moment from "moment";
import { fireEvent, render, screen } from "@src/test-utils";

describe("DatePicker", () => {
  describe("Test error message", () => {
    it("should render error message", () => {
      const onChange = jest.fn();
      render(
        <DatePicker
          errorMessage="error message"
          value={moment().toDate()}
          onChange={onChange}
        />
      );
      expect(screen.getByText(/error message/)).toBeOnTheScreen();
    });
  });
  describe("Test component children", () => {
    it("should render properly", () => {
      const onChange = jest.fn();
      render(
        <DatePicker
          testID="date-picker-container"
          value={moment().toDate()}
          onChange={onChange}
        />
      );
      expect(screen.getByTestId("date-picker-container")).toBeTruthy();
    });
    it("should show the date picker when the input is pressed", () => {
      const onChange = jest.fn();
      render(
        <DatePicker
          testID="date-picker-container"
          value={moment().toDate()}
          onChange={onChange}
        />
      );
      const input = screen.getByTestId("date-picker-input");
      fireEvent.press(input);
      const datePicker = screen.getByTestId("date-picker");
      expect(datePicker).toBeTruthy();
    });
  });
});
