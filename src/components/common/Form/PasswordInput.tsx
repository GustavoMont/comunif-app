import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

const Input = styled.TextInput``;

export const PasswordInput: React.FC<TextInputProps> = (props) => {
  return <Input {...props} secureTextEntry />;
};
