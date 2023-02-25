import React from "react";
import { render, screen } from "@testing-library/react-native";
import Login from "../Login";
import { ThemeProvider } from "styled-components/native";
import { light } from "../../styles/themes/light";

describe("Login screen", () => {
  it("Check all texts", async () => {
    render(
      <ThemeProvider theme={light}>
        <Login />
      </ThemeProvider>
    );
    expect(screen.getAllByText(/login/gi)).toHaveLength(2);
    expect(
      screen.getByPlaceholderText(/insira seu username ou email/gi)
    ).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/sua senha/gi)).toBeOnTheScreen();
    expect(screen.getByText(/Esqueceu sua senha?/gi)).toBeOnTheScreen();
    expect(screen.getByText(/Ainda não possui conta?/gi)).toBeOnTheScreen();
  });
});
