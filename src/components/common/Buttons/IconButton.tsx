import { colorKeyType } from "@src/types/colors";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";

interface ButtonProps {
  color?: colorKeyType;
  rounded?: boolean;
  iconSize: number;
}

const Button = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${({ theme: { colors }, color }) =>
    color ? colors[color] : "transparent"};
  width: ${({ iconSize }) => iconSize}px;
  height: ${({ iconSize }) => iconSize}px;
  padding: ${({ color }) => (color ? "20px" : "0px")};
  border-radius: ${({ rounded }) => (rounded ? 5000 : 8)}px;
  align-items: center;
  justify-content: center;
`;

interface Props extends ButtonProps, Omit<TouchableOpacityProps, "children"> {
  icon: (props: SvgProps) => JSX.Element;
  iconColor: colorKeyType;
  accessibilityLabel: string;
}

export const IconButton: React.FC<Props> = ({
  color,
  icon: Icon,
  iconColor,
  iconSize,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Button
      {...props}
      iconSize={iconSize}
      color={color}
      accessibilityRole="button"
    >
      <Icon color={colors[iconColor]} width={iconSize} />
    </Button>
  );
};
