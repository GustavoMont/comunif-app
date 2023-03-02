import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { DatePicker } from "../DatePicker";
import moment from "moment";
import { ThemeProvider } from "styled-components/native";
import { light } from "@styles/themes/light";

describe("DatePicker", () => {
  it("should render properly", () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={light}>
        <DatePicker
          testID="date-picker-container"
          value={moment().toDate()}
          onChange={onChange}
        />
      </ThemeProvider>
    );
    expect(screen.getByTestId("date-picker-container")).toBeTruthy();
  });

  it("should show the date picker when the input is pressed", () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={light}>
        <DatePicker
          testID="date-picker-container"
          value={moment().toDate()}
          onChange={onChange}
        />
      </ThemeProvider>
    );
    const input = screen.getByTestId("date-picker-input");
    fireEvent.press(input);
    const datePicker = screen.getByTestId("date-picker");
    expect(datePicker).toBeTruthy();
  });
});
