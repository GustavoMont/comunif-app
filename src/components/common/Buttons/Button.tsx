import React from "react";
import { TouchableOpacityProps } from "react-native";
import { colorKeyType } from "src/types/colors";
import styled from "styled-components/native";
import { FlexGap } from "../Layout/FlexGap";

interface ButtonProps {
  minSize?: boolean;
  color?: colorKeyType;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

const TouchableButton = styled.TouchableOpacity<ButtonProps>`
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ theme, color }) => theme.colors[color || "primary"]};
  ${({ minSize }) => (!!minSize ? "" : "width: 100%;")}
  padding: 12px 32px;
  text-align: center;
  border-radius: 8px;
`;

interface Props extends ButtonProps, TouchableOpacityProps {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <TouchableButton {...props}>
      <FlexGap gap={16} direction="row" style={{ alignItems: "center" }}>
        {leftIcon || <></>}
        {children}
        {rightIcon || <></>}
      </FlexGap>
    </TouchableButton>
  );
};
