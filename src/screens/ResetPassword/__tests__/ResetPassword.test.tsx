import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { ResetPassword } from "../ResetPassword";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FreeStackRoutes } from "@src/types/navigation/freeRoutes";
import { hashedEmailKey, resetPassword } from "@src/services/authServices";
import { setItemAsync } from "expo-secure-store";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

jest.mock("@src/services/authServices", () => ({
  ...jest.requireActual("@src/services/authServices"),
  resetPassword: jest.fn(),
}));

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
}));

jest.mock("react-native-toast-message/lib/src/Toast", () => ({
  Toast: {
    show: jest.fn(),
  },
}));

const navigate = jest.fn();

type Props = NativeStackScreenProps<FreeStackRoutes, "ForgotPassword">;

describe("ResetPassword Screen", () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigate);
  });
  describe("Content", () => {
    it("should have all texts and elements", () => {
      render(<ResetPassword {...({} as Props)} />);
      expect(screen.getByText(/Recuperar Senha/gi)).toBeOnTheScreen();
      expect(
        screen.getByText(/Enviaremos um código de recuperação para o e-mail/gi)
      ).toBeOnTheScreen();
      expect(screen.getByText(/E-mail:/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/insira seu e-mail/gi)
      ).toBeOnTheScreen();
      expect(screen.getByRole("button")).toBeOnTheScreen();
      expect(screen.getByText(/Já possuo o código/gi)).toBeOnTheScreen();
    });
  });
  describe("Redirect to confirm code screen", () => {
    describe("By Form", () => {
      it("should not redirect", async () => {
        render(<ResetPassword {...({} as Props)} />);
        const submitButton = screen.getByRole("button");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(
            screen.getByText(/Insira um e-mail válido/gi)
          ).toBeOnTheScreen();
        });
      });
      it("should show succesfuly message and redirect", async () => {
        const hashedEmailValue = "hashedEmail";
        const navigate = jest.fn();
        (resetPassword as jest.Mock).mockResolvedValue(hashedEmailValue);
        (setItemAsync as jest.Mock).mockResolvedValue(true);
        render(
          <ResetPassword
            {...({
              navigation: {
                navigate,
              },
            } as any)}
          />
        );
        const submitButton = screen.getByRole("button");
        const input = screen.getByPlaceholderText(/insira seu e-mail/gi);
        const email = "email@email.com";
        fireEvent.changeText(input, email);
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(resetPassword).toBeCalledWith({ email });
        });
        await waitFor(() =>
          expect(setItemAsync).toBeCalledWith(hashedEmailKey, hashedEmailValue)
        );

        expect(screen.getByText(/E-mail enviado!/)).toBeOnTheScreen();
        expect(
          screen.getByText(
            /Foi enviado um código de segurança para seu e-mail. Cheque agora seu e-mail/
          )
        ).toBeOnTheScreen();
        fireEvent.press(screen.getByTestId("modal-close-button"));
        await waitFor(() => {
          expect(navigate).toBeCalledWith("ConfirmCode");
        });
      });
    });
    describe("By Link", () => {
      it("should redirect to ConfirmCode screen", () => {
        render(<ResetPassword {...({} as Props)} />);
        const link = screen.getByText(/Já possuo o código/);
        expect(link.props.screen).toBe("ConfirmCode");
      });
    });
  });
});
