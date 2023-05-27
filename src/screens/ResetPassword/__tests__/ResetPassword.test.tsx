import React from "react";
import { render, screen } from "@src/test-utils";
import { ResetPassword } from "../ResetPassword";

describe("ResetPassword Screen", () => {
  describe("Content", () => {
    it("should have all texts and elements", () => {
      render(<ResetPassword />);
      expect(screen.getByText(/Recuperar Senha/gi)).toBeOnTheScreen();
      expect(
        screen.getByText(/Enviaremos um código de recuperação para o e-mail/gi)
      ).toBeOnTheScreen();
      expect(screen.getByText(/E-mail:/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/insira seu e-mail/gi)
      ).toBeOnTheScreen();
      expect(screen.getByRole("button")).toBeOnTheScreen();
      expect(screen.getByText(/Já posssuo o código/gi)).toBeOnTheScreen();
    });
  });
  describe("Functionalities", () => {
    it.todo("should redirect to confirm code");
    it.todo("should show succesfuly message");
  });
});
