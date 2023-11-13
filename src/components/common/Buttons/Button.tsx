import React from "react";
import {
  FlexAlignType,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colorKeyType } from "src/types/colors";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { Spinner } from "tamagui";

type buttonType = "rounded" | "main";

interface ButtonProps {
  minSize?: boolean;
  color?: colorKeyType | "none";
  alignSelf?: FlexAlignType;
  type?: buttonType;
  centerContent?: boolean;
}

interface ButtonStyleProps {
  radius: number;
}

const buttonStyle: Record<buttonType, ButtonStyleProps> = {
  main: { radius: 8 },
  rounded: { radius: 800 },
};

const TouchableButton = styled(TouchableOpacity)<ButtonProps>`
  font-weight: 500;
  background-color: ${({ theme, color }) =>
    color === "none" ? "transparent" : theme.colors[color || "primary"]};
  ${({ minSize }) => (!!minSize ? "" : "width: 100%;")}
  padding: ${({ color }) => (color === "none" ? "0px" : "12px")};
  text-align: center;
  border-radius: ${({ type = "main" }) => buttonStyle[type].radius}px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: ${({ centerContent }) =>
    centerContent ? "center" : "flex-start"};
  align-self: ${({ alignSelf = "stretch" }) => alignSelf};
`;

interface Props extends ButtonProps, TouchableOpacityProps {
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  isLoading?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  color,
  minSize,
  alignSelf,
  type,
  isLoading,
  ...props
}) => {
  const { colors } = useTheme();
  const handleIcon = (icon: JSX.Element) => {
    return isLoading ? (
      <Spinner color={colors.white} accessibilityLabel="Carregando" />
    ) : (
      icon
    );
  };
  const hasNoIcon = !leftIcon && !rightIcon;

  return (
    <TouchableButton
      {...props}
      type={type}
      alignSelf={alignSelf}
      color={color}
      minSize={minSize}
      accessibilityRole="button"
    >
      {leftIcon ? handleIcon(leftIcon) : <></>}
      {hasNoIcon && isLoading ? (
        <Spinner color={colors.white} accessibilityLabel="Carregando" />
      ) : (
        children
      )}
      {rightIcon ? handleIcon(rightIcon) : <></>}
    </TouchableButton>
  );
};
