import { render, screen, waitFor } from "@src/test-utils";
import { TextInput } from "../TextInput";

describe("TextInput", () => {
  describe("Testing placeholder", () => {
    it("should render placeholder correctly", () => {
      render(<TextInput placeholder="Placeholder padrão" />);
      expect(
        screen.getByPlaceholderText(/Placeholder padrão/)
      ).toBeOnTheScreen();
    });
    it("should render error message correctly", async () => {
      render(
        <TextInput placeholder="Placeholder padrão" errorMessage="Erro" />
      );
      await waitFor(() =>
        expect(screen.getByPlaceholderText(/Erro/)).toBeOnTheScreen()
      );
    });
    it("should switch error and placeholder", async () => {
      const { rerender } = render(
        <TextInput placeholder="Placeholder padrão" />
      );
      expect(
        screen.getByPlaceholderText(/Placeholder padrão/)
      ).toBeOnTheScreen();
      expect(screen.queryByPlaceholderText(/Erro/)).not.toBeOnTheScreen();
      rerender(
        <TextInput placeholder="Placeholder padrão" errorMessage="Erro" />
      );
      await waitFor(() =>
        expect(screen.getByPlaceholderText(/Erro/)).toBeOnTheScreen()
      );
      expect(
        screen.queryByPlaceholderText(/Placeholder padrão/)
      ).not.toBeOnTheScreen();
      rerender(<TextInput placeholder="Placeholder padrão" />);
      await waitFor(() =>
        expect(
          screen.getByPlaceholderText(/Placeholder padrão/)
        ).toBeOnTheScreen()
      );
      expect(screen.queryByPlaceholderText(/Erro/)).not.toBeOnTheScreen();
    });
  });
  describe("Testing label", () => {
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
