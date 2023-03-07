import React from "react";
import { StyleSheet, TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { BodyText } from "../Typograph/BodyText";
import { ErrorContainer } from "./ErrorContainer";

interface StylePropIncrement extends TextInputProps {
  hasError?: boolean;
  hasIcon: hasIconType;
}

const Input = styled.TextInput.attrs<StylePropIncrement>(
  ({ theme, hasError, ...props }) => {
    return {
      placeholderTextColor: hasError
        ? theme.colors.error
        : theme.input.placeholderColor,
      ...props,
    };
  }
)<StylePropIncrement>`
  border: 1.5px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.input.borderColor};
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  ${({ hasIcon, theme: { input } }) =>
    hasIcon !== "none" ? `padding-${hasIcon}: ${input.iconSize + 16}px;` : ""}
  font-family: ${({ theme }) => theme.fonts.text[500]};
  font-size: ${({ theme }) => theme.input.fontSize}px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.colors["white"]};
`;

const Container = styled.View`
  position: relative;
`;

const IconPlace = styled.View<{ position: "right" | "left" }>`
  position: absolute;
  z-index: 2;
  ${({ position }) => `${position}: 8px;`}
  top: 10%;
  justify-content: center;
  background-color: ${({ theme: { input } }) => input.backgroundColor};
  height: 80%;
`;

type hasIconType = "none" | "left" | "right";

export interface InputProps extends Partial<TextInputProps> {
  label?: string;
  errorMessage?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export const TextInput: React.FC<InputProps> = ({
  label,
  errorMessage,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const hasIcon = (
    hasLeftIcon: boolean,
    hasRightIcon: boolean
  ): hasIconType => {
    if (hasLeftIcon && hasRightIcon) {
      throw new Error("Can use only one icon");
    } else if (hasLeftIcon) {
      return "left";
    } else if (hasRightIcon) {
      return "right";
    } else {
      return "none";
    }
  };
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  const hasErrorMessage = !!errorMessage;
  return (
    <View style={[styles.inputSize, style || {}]}>
      {label && <BodyText style={styles.inputSize}>{label}</BodyText>}
      <Container>
        {hasLeftIcon && <IconPlace position="left">{leftIcon}</IconPlace>}
        <Input
          hasError={hasErrorMessage}
          hasIcon={hasIcon(hasLeftIcon, hasRightIcon)}
          {...(props as unknown as any)}
        />
        {hasRightIcon && <IconPlace position="right">{rightIcon}</IconPlace>}
      </Container>
      <ErrorContainer>
        {hasErrorMessage && (
          <BodyText color="error" size={10}>
            {errorMessage}
          </BodyText>
        )}
      </ErrorContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSize: { width: "100%" },
});
