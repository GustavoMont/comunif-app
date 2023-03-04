import { render, screen, waitFor } from "@src/test-utils";
import { TextInput } from "../TextInput";

describe("TextInput", () => {
  describe("Test Error message", () => {
    it("should render error message", () => {
      render(<TextInput errorMessage="error message" />);
      expect(screen.getByText(/error message/)).toBeOnTheScreen();
    });
    it("should switch render error message", () => {
      const { rerender } = render(<TextInput />);
      expect(screen.queryByText(/error message/)).not.toBeOnTheScreen();
      rerender(<TextInput errorMessage="error message" />);
      expect(screen.getByText(/error message/)).toBeOnTheScreen();
    });
  });
  describe("Test label", () => {
    it("should render label", () => {
      render(<TextInput label="Label" />);
      expect(screen.getByText(/Label/)).toBeOnTheScreen();
    });
    it("should not render label", () => {
      render(<TextInput />);
      expect(screen.queryByText(/Label/)).not.toBeOnTheScreen();
    });
  });
});
