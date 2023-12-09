import React from "react";
import { Steps } from "../Steps";
import { render, screen } from "@src/test-utils";

describe("Steps", () => {
  it("should have 4 steps", () => {
    render(<Steps currentStep={0} size={16} stepsQuantity={4} />);
    expect(screen.getAllByTestId("step")).toHaveLength(4);
  });
  it("should render correct status", () => {
    const { rerender } = render(
      <Steps currentStep={0} size={16} stepsQuantity={3} />
    );
    const [step1, step2, step3] = screen.getAllByTestId("step-circle");
    expect(step1).toHaveProp("status", "progress");
    expect(step2).toHaveProp("status", "todo");
    expect(step3).toHaveProp("status", "todo");
    rerender(<Steps currentStep={1} size={16} stepsQuantity={3} />);
    expect(step1).toHaveProp("status", "done");
    expect(step2).toHaveProp("status", "progress");
    expect(step3).toHaveProp("status", "todo");
    rerender(<Steps currentStep={2} size={16} stepsQuantity={3} />);
    expect(step1).toHaveProp("status", "done");
    expect(step2).toHaveProp("status", "done");
    expect(step3).toHaveProp("status", "progress");
  });
  it("should have 2 conectors", () => {
    render(<Steps currentStep={0} size={16} stepsQuantity={3} />);
    expect(screen.getAllByTestId("step-conector")).toHaveLength(2);
  });
});
