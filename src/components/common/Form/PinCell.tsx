import React from "react";
import { TextProps } from "react-native";
import { Cursor } from "react-native-confirmation-code-field";
import styled from "styled-components/native";
import { BodyText } from "../Typograph/BodyText";

const TextCell = styled.View`
  border: 2px ${({ theme }) => theme.colors.darkWhite};
  border-radius: 4px;
  padding: 2px;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundScreen};
`;

const Circle = styled.View`
  width: 12px;
  height: 12px;
  border: 2px ${({ theme }) => theme.colors.darkWhite};
  border-radius: 80px;
`;

interface Props extends Omit<TextProps, "children"> {
  isFocused: boolean;
  symbol: string;
}

export const PinCell: React.FC<Props> = ({ symbol, isFocused, ...props }) => (
  <TextCell {...(props as any)}>
    {symbol ? (
      <BodyText>{symbol}</BodyText>
    ) : isFocused ? (
      <BodyText>
        <Cursor />
      </BodyText>
    ) : (
      <Circle />
    )}
  </TextCell>
);
