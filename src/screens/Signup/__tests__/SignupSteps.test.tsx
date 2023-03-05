import React from "react";
import { ThemeProvider } from "styled-components/native";
import { light } from "../../../styles/themes/light";
import { ComunitiesStep } from "../Steps/ComunitiesStep";
import { NameStep } from "../Steps/NameStep";
import { PasswordStep } from "../Steps/PasswordStep";
import { UserInfoStep } from "../Steps/UserInfoStep";
import "react-native-dropdown-picker";
import { WrapperControll } from "@mocks/WrapperControll";
import moment from "moment";
import { render, screen } from "@src/test-utils";

jest.mock(
  "react-native-dropdown-picker",
  () =>
    ({ placeholder, ...props }: any) => {
      const { Text, View } = require("react-native");
      return (
        <View>
          <Text>{placeholder}</Text>
        </View>
      );
    }
);

interface RegisterPayload {
  name: string;
  lastName: string;
  email: string;
  username: string;
  birthday: Date;
  password: string;
  confirmPassword: string;
}

describe("Test Signup steps", () => {
  describe("First step", () => {
    it("should contain all texts", () => {
      render(<WrapperControll children={NameStep} />);
      expect(screen.getByText(/Nome:/)).toBeOnTheScreen();
      expect(screen.getByText(/Sobrenome:/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite aqui seu primeiro nome:/)
      ).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite aqui seu sobrenome:/)
      ).toBeOnTheScreen();
    });
  });
  describe("Second step", () => {
    it("should contain all text", () => {
      render(<WrapperControll children={UserInfoStep} />);
      expect(screen.getByText(/Username:/)).toBeOnTheScreen();
      expect(screen.getByText(/Data de nascimento:/)).toBeOnTheScreen();
      expect(screen.getByText(/E-mail:/)).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite um nome de usuário/)
      ).toBeOnTheScreen();
      expect(screen.getByText(moment().format("DD/MM/YY"))).toBeOnTheScreen();
      expect(
        screen.getByPlaceholderText(/Digite seu e-mail/)
      ).toBeOnTheScreen();
    });
  });
  describe("Third step", () => {
    it("should contain all text", () => {
      render(<WrapperControll children={PasswordStep} />);
      expect(screen.getByText(/Senha:/)).toBeOnTheScreen();
      expect(screen.getByText(/Confirmar senha:/)).toBeOnTheScreen();
      expect(
        screen.getAllByPlaceholderText(/Digite uma senha forte/)
      ).toHaveLength(2);
    });
  });
  describe("Fourth step", () => {
    it("should contain all text", () => {
      render(
        <ThemeProvider theme={light}>
          <ComunitiesStep />
        </ThemeProvider>
      );
      expect(
        screen.getByText(/Quais comunidades você tem interesse?/)
      ).toBeOnTheScreen();
      expect(
        screen.getByText(/Nenhuma comunidade selecionada/)
      ).toBeOnTheScreen();
      expect(
        screen.getByText(/Nenhuma comunidade selecionada/)
      ).toBeOnTheScreen();
      expect(screen.getByText(/Selecione uma opção/)).toBeOnTheScreen();
    });
  });
});
