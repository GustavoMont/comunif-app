import React from "react";
import { render, screen } from "@testing-library/react-native";
import Login from "../Login";
import { ThemeProvider } from "styled-components/native";
import { light } from "../../styles/themes/light";
import "../../components/common/Typograph/Link";

jest.mock("../../components/common/Typograph/Link", () => ({
  ...jest.requireActual("../../components/common/Typograph/Link"),
  Link({ children, ...props }: any) {
    const { Text } = require("react-native");
    return <Text {...props}>{children}</Text>;
  },
}));

describe("Login screen", () => {
  it("should have all texts", async () => {
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
    expect(screen.getByText(/Cadastre-se/gi)).toBeOnTheScreen();
  });
  it("should redirect to write screen", async () => {
    render(
      <ThemeProvider theme={light}>
        <Login />
      </ThemeProvider>
    );
    const signupLink = screen.getByText(/Cadastre-se/gi);
    const resetPassword = screen.getByText(/Esqueceu sua senha?/gi);
    expect(signupLink.props.screen).toBe("Sign up");
    expect(resetPassword.props.screen).toBe("Forgot password");
  });
});
