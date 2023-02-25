import { render, screen } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { light } from "../../../styles/themes/light";
import { NameStep } from "../Steps/NameStep";
import { UserInfoStep } from "../Steps/UserInfoStep";

describe("Test Signup steps", () => {
  describe("First step", () => {
    it("should contain all texts", () => {
      render(
        <ThemeProvider theme={light}>
          <NameStep />
        </ThemeProvider>
      );
      expect(screen.getByText(/Primeiro nome:/)).toBeOnTheScreen();
      expect(screen.getByText(/Sobrenome:/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite aqui seu primeiro nome/)
      ).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite seu sobre nome/)
      ).toBeOnTheScreen();
    });
  });
  describe("Second step", () => {
    it("should contain all text", () => {
      render(
        <ThemeProvider theme={light}>
          <UserInfoStep />
        </ThemeProvider>
      );
      expect(screen.getByText(/Username:/)).toBeOnTheScreen();
      expect(screen.getByText(/Data de nascimento:/)).toBeOnTheScreen();
      expect(screen.getByText(/E-mail:/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite um nome de usuário/)
      ).toBeOnTheScreen();
      expect(screen.getByPlaceholderText(/Escolha a data/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite seu e-mail/)
      ).toBeOnTheScreen();
    });
  });
});
