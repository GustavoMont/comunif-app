import React from "react";
import { TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { BodyText } from "../Typograph/BodyText";
import { ErrorContainer } from "./ErrorContainer";

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

interface StylePropIncrement extends TextInputProps {
  hasError?: boolean;
  hasIcon: hasIconType;
}

export interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export const TextInput: React.FC<InputProps> = ({
  label,
  style,
  errorMessage,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const hasIcon = (
    hasLeftIcon: boolean,
    hasRightIcon: boolean
  ): hasIconType => {
    if (hasLeftIcon && hasRightIcon) {
      throw new Error("Can use only one icon");
    } else if (leftIcon) {
      return "left";
    } else if (rightIcon) {
      return "right";
    } else {
      return "none";
    }
  };
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  const hasErrorMessage = !!errorMessage;
  return (
    <View style={[{ width: "100%" }, style || {}]}>
      {label && <BodyText style={{ width: "100%" }}>{label}</BodyText>}
      <Container>
        {hasLeftIcon && <IconPlace position="left">{leftIcon}</IconPlace>}
        <Input
          {...props}
          hasError={hasErrorMessage}
          hasIcon={hasIcon(hasLeftIcon, hasRightIcon)}
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
