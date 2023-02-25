import React from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "./InputText";

export const PasswordInput: React.FC<TextInputProps> = (props) => {
  return <TextInput {...props} secureTextEntry />;
};
