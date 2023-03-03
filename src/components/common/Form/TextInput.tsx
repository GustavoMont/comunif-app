import React from "react";
import { TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { BodyText } from "../Typograph/BodyText";

const Input = styled.TextInput.attrs<InputProps>(
  ({ theme, hasError, ...props }) => {
    return {
      placeholderTextColor: hasError
        ? theme.colors.error
        : theme.input.placeholderColor,
      ...props,
    };
  }
)<InputProps>`
  border: 1.5px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.input.borderColor};
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  font-family: ${({ theme }) => theme.fonts.text[500]};
  font-size: ${({ theme }) => theme.input.fontSize}px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.colors["white"]};
`;

export interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  hasError?: boolean;
}

export const TextInput: React.FC<InputProps> = ({
  label,
  style,
  placeholder,
  errorMessage,
  ...props
}) => {
  return (
    <View style={[{ width: "100%" }, style]}>
      {label && <BodyText style={{ width: "100%" }}>{label}</BodyText>}
      <Input
        {...props}
        placeholder={errorMessage || placeholder}
        hasError={!!errorMessage}
      />
    </View>
  );
};
