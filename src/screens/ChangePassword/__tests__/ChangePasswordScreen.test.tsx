import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { ChangePasswordScreen } from "../ChangePasswordScreen";
import { ChangePasswordScreenProps } from "@src/types/navigation/freeRoutes";
import { changePassword } from "@src/services/auth-services";

jest.mock("@src/services/auth-services", () => ({
  changePassword: jest.fn(),
}));

describe("ChangePassword Screen", () => {
  it("should have all content", () => {
    render(<ChangePasswordScreen {...({} as ChangePasswordScreenProps)} />);
    expect(screen.getByText(/Mudar a senha/gi)).toBeOnTheScreen();
    expect(screen.getByText(/Nova senha:/gi)).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText(/insira a nova senha/gi)
    ).toBeOnTheScreen();
    expect(screen.getByText(/Confirmar senha:/g)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/confirmar senha/gi)).toBeOnTheScreen();
    expect(
      screen.getByRole("button", { name: /Alterar senha/gi })
    ).toBeOnTheScreen();
  });
  it("should use password validation", async () => {
    render(<ChangePasswordScreen {...({} as ChangePasswordScreenProps)} />);
    const password = "1234567";
    const passwordInput = screen.getByPlaceholderText(/insira a nova senha/gi);
    fireEvent.changeText(passwordInput, password);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirmar senha/gi);
    fireEvent.changeText(confirmPasswordInput, "a");
    fireEvent.press(screen.getByRole("button", { name: /Alterar senha/gi }));

    expect(await screen.findByText("Senhas não coincidem"));
    expect(
      await screen.findByText(
        "Senha precisa ter no mínimo 8 caractéres, uma letra e um número"
      )
    );
  });
  it("should not open modal", async () => {
    (changePassword as jest.Mock).mockRejectedValue(null);
    const navigate = jest.fn();
    render(
      <ChangePasswordScreen
        {...({
          navigation: {
            navigate,
          },
        } as unknown as ChangePasswordScreenProps)}
      />
    );
    const password = "12345678S";
    const passwordInput = screen.getByPlaceholderText(/insira a nova senha/gi);
    fireEvent.changeText(passwordInput, password);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirmar senha/gi);
    fireEvent.changeText(confirmPasswordInput, password);
    fireEvent.press(screen.getByRole("button", { name: /Alterar senha/gi }));
    await waitFor(() => {
      expect(changePassword).toBeCalled();
    });
    expect(navigate).not.toBeCalled();
  });
  it("should open password changed modal", async () => {
    (changePassword as jest.Mock).mockResolvedValue({});
    const navigate = jest.fn();
    render(
      <ChangePasswordScreen
        {...({
          navigation: {
            navigate,
          },
        } as unknown as ChangePasswordScreenProps)}
      />
    );
    const password = "12345678S";
    const passwordInput = screen.getByPlaceholderText(/insira a nova senha/gi);
    fireEvent.changeText(passwordInput, password);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirmar senha/gi);
    fireEvent.changeText(confirmPasswordInput, password);
    fireEvent.press(screen.getByRole("button", { name: /Alterar senha/gi }));
    await waitFor(() => {
      expect(changePassword).toBeCalledWith({
        password,
        confirmPassword: password,
      });
    });
    expect(await screen.findByText(/Senha alterada!/g)).toBeOnTheScreen();
    expect(
      screen.getByText(
        /Você já pode usar sua nova senha para acessar o aplicativo!/g
      )
    ).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId("close-modal-button"));
    await waitFor(() => {
      expect(navigate).toBeCalledWith("Login");
    });
  });
});
