import React from "react";
import { InputProps, TextInput } from "./InputText";

export const PasswordInput: React.FC<InputProps> = (props) => {
  return <TextInput {...props} secureTextEntry />;
};
