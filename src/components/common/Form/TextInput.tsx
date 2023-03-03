import React, { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { BodyText } from "../Typograph/BodyText";

interface InputPropsIncrement {
  hasError?: boolean;
}
const Input = styled.TextInput.attrs<InputPropsIncrement>(
  ({ theme, hasError, ...props }) => {
    return {
      placeholderTextColor: theme.input.placeholderColor,
      ...props,
    };
  }
)`
  border: 1.5px solid ${({ theme }) => theme.input.borderColor};
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
      <Input {...props} placeholder={errorMessage || placeholder} />
    </View>
  );
};
