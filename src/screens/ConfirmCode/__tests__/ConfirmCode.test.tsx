import React from "react";
/**
 * Todo conteúdo da página
 * Inserir código e confirmar
 * ao confirmar redirecionar para o mudar senha
 */

import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { ConfirmCode } from "../ConfirmCode";
import { ConfirmCodeScreenProps } from "@src/types/navigation/freeRoutes";
import { confirmCode } from "@src/services/authServices";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { accessKey } from "@src/utils/token";

jest.mock("@src/services/authServices", () => ({
  ...jest.requireActual("@src/services/authServices"),
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
    expect(link.props.screen).toBe("ChangePassword");
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
          accessKey,
          JSON.stringify(confirmCodeResponse)
        );
      });
      await waitFor(() => {
        expect(navigate).toBeCalledWith("ChangePassword");
      });
    });
  });
});
