import React from "react";
import { light } from "@styles/themes/light";
import { render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { Steps } from "../Steps";

describe("Steps", () => {
  it("should have 4 steps", () => {
    render(
      <ThemeProvider theme={light}>
        <Steps currentStep={0} size={16} stepsQuantity={4} />
      </ThemeProvider>
    );
    expect(screen.getAllByTestId("step")).toHaveLength(4);
  });
  it("should render correct status", () => {
    const { rerender } = render(
      <ThemeProvider theme={light}>
        <Steps currentStep={0} size={16} stepsQuantity={3} />
      </ThemeProvider>
    );
    const [step1, step2, step3] = screen.getAllByTestId("step-circle");
    expect(step1).toHaveProp("status", "progress");
    expect(step2).toHaveProp("status", "todo");
    expect(step3).toHaveProp("status", "todo");
    rerender(
      <ThemeProvider theme={light}>
        <Steps currentStep={1} size={16} stepsQuantity={3} />
      </ThemeProvider>
    );
    expect(step1).toHaveProp("status", "done");
    expect(step2).toHaveProp("status", "progress");
    expect(step3).toHaveProp("status", "todo");
    rerender(
      <ThemeProvider theme={light}>
        <Steps currentStep={2} size={16} stepsQuantity={3} />
      </ThemeProvider>
    );
    expect(step1).toHaveProp("status", "done");
    expect(step2).toHaveProp("status", "done");
    expect(step3).toHaveProp("status", "progress");
  });
  it("should have 2 conectors", () => {
    render(
      <ThemeProvider theme={light}>
        <Steps currentStep={0} size={16} stepsQuantity={3} />
      </ThemeProvider>
    );
    expect(screen.getAllByTestId("step-conector")).toHaveLength(2);
  });
});
