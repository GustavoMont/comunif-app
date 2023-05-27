import React from "react";
import {
  FlexAlignType,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colorKeyType } from "src/types/colors";
import styled from "styled-components/native";

type buttonType = "rounded" | "main";

interface ButtonProps {
  minSize?: boolean;
  color?: colorKeyType;
  alignSelf?: FlexAlignType;
  type?: buttonType;
}

interface ButtonStyleProps {
  radius: number;
}

const buttonStyle: Record<buttonType, ButtonStyleProps> = {
  main: { radius: 8 },
  rounded: { radius: 800 },
};

const TouchableButton = styled.TouchableOpacity<ButtonProps>`
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ theme, color }) => theme.colors[color || "primary"]};
  ${({ minSize }) => (!!minSize ? "" : "width: 100%;")}
  padding: 12px 32px;
  text-align: center;
  border-radius: ${({ type = "main" }) => buttonStyle[type].radius}px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  align-self: ${({ alignSelf = "stretch" }) => alignSelf};
`;

interface Props extends ButtonProps, TouchableOpacityProps {
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

export const Button: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  color,
  minSize,
  alignSelf,
  type,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <TouchableButton
        type={type}
        alignSelf={alignSelf}
        color={color}
        minSize={minSize}
      >
        {leftIcon || <></>}
        {children}
        {rightIcon || <></>}
      </TouchableButton>
    </TouchableOpacity>
  );
};
