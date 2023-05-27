/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Login } from "../Login";
import { ThemeProvider } from "styled-components/native";
import { light } from "../../../styles/themes/light";
import "../../../components/common/Typograph/Link";
import { useAuth } from "@src/hooks/useAuth";
import { LoginPayload } from "@src/models/User";

jest.mock("@hooks/useAuth", () => ({
  useAuth: jest.fn().mockReturnValue({
    login: jest.fn(),
  }),
}));
jest.mock("react-native-toast-message/lib/src/Toast", () =>
  jest.fn().mockRejectedValue({})
);
jest.mock("../../../components/common/Typograph/Link", () => ({
  ...jest.requireActual("../../../components/common/Typograph/Link"),
  Link({ children, ...props }: any) {
    const { Text } = require("react-native");
    return <Text {...props}>{children}</Text>;
  },
}));

describe("Login screen", () => {
  describe("Content", () => {
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
      expect(signupLink.props.screen).toBe("Signup");
      expect(resetPassword.props.screen).toBe("ForgotPassword");
    });
  });
  describe("Login func", () => {
    it("should use login function", async () => {
      const login = jest.fn();
      (useAuth as jest.Mock).mockReturnValue({
        login,
      });
      render(
        <ThemeProvider theme={light}>
          <Login />
        </ThemeProvider>
      );
      const usernameInput = screen.getByPlaceholderText(
        /insira seu username ou email/gi
      );
      const passwordInput = screen.getByPlaceholderText(/sua senha/gi);
      const username = "username";
      const password = "password";
      fireEvent.changeText(usernameInput, username);
      fireEvent.changeText(passwordInput, password);

      fireEvent.press(screen.getByTestId("loginBtn"));

      return await waitFor(() =>
        expect(login).toBeCalledWith({ username, password } as LoginPayload)
      );
    });
  });
});
