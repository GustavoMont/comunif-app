import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colorKeyType } from "src/types/colors";
import styled from "styled-components/native";
import { FlexGap } from "../Layout/FlexGap";

interface ButtonProps {
  minSize?: boolean;
  color?: colorKeyType;
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
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

export const Button: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  color,
  minSize,
  ...props
}) => {
  return (
    <TouchableButton color={color} minSize={minSize}>
      <TouchableOpacity {...props}>
        <FlexGap gap={16} direction="row" style={styles.textContainer}>
          {leftIcon || <></>}
          {children}
          {rightIcon || <></>}
        </FlexGap>
      </TouchableOpacity>
    </TouchableButton>
  );
};

const styles = StyleSheet.create({
  textContainer: { alignItems: "center" },
});
