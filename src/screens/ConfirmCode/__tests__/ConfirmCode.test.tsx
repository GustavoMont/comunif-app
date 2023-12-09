import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { ConfirmCode } from "../ConfirmCode";
import { ConfirmCodeScreenProps } from "@src/types/navigation/freeRoutes";
import { confirmCode } from "@src/services/auth-services";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { tokenKeys } from "@src/utils/token";

jest.mock("@src/services/auth-services", () => ({
  ...jest.requireActual("@src/services/auth-services"),
  confirmCode: jest.fn(),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

describe("ConfirmCode screen", () => {
  it("should have all content", () => {
    render(<ConfirmCode {...({} as ConfirmCodeScreenProps)} />);
    expect(screen.getByText(/Recuperar senha/g)).toBeOnTheScreen();
    expect(screen.getByText(/Insira o código enviado/)).toBeOnTheScreen();
    expect(
      screen.getByRole("button", { name: /Confirmar/g })
    ).toBeOnTheScreen();
    expect(screen.getByText(/Voltar/g)).toBeOnTheScreen();
  });
  it("should redirect to reset-password screen", () => {
    render(<ConfirmCode {...({} as ConfirmCodeScreenProps)} />);
    const link = screen.getByText(/Voltar/g);
    expect(link.props.screen).toBe("ForgotPassword");
  });
  describe("Confirming code", () => {
    it("should not redirect to change password", async () => {
      const navigate = jest.fn();
      (confirmCode as jest.Mock).mockRejectedValue({});
      render(
        <ConfirmCode
          {...({
            navigation: {
              navigate,
            },
          } as any)}
        />
      );
      const input = screen.getByTestId("code-input");
      fireEvent.changeText(input, "000000");
      const button = screen.getByRole("button", { name: /Confirmar/g });
      fireEvent.press(button);
      await waitFor(() => {
        expect(navigate).not.toBeCalled();
      });
    });
    it("should redirect to change password screen", async () => {
      const navigate = jest.fn();
      const hashedEmail = "email";
      const confirmCodeResponse = {
        access: "access-key",
      };
      (confirmCode as jest.Mock).mockResolvedValue(confirmCodeResponse);
      (getItemAsync as jest.Mock).mockResolvedValue(hashedEmail);
      render(
        <ConfirmCode
          {...({
            navigation: {
              navigate,
            },
          } as any)}
        />
      );
      const code = "000000";
      const input = screen.getByTestId("code-input");
      fireEvent.changeText(input, code);
      const button = screen.getByRole("button", { name: /Confirmar/g });
      fireEvent.press(button);
      await waitFor(() => {
        expect(confirmCode).toBeCalledWith({
          code,
          email: hashedEmail,
        });
      });
      await waitFor(() => {
        expect(setItemAsync).toBeCalledWith(
          tokenKeys.access,
          confirmCodeResponse.access
        );
      });
      await waitFor(() => {
        expect(navigate).toBeCalledWith("ChangePassword");
      });
    });
  });
});
