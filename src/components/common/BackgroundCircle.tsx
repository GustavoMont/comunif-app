import { FlatList, Text, View } from "react-native";
import React, { Component } from "react";
import styled from "styled-components/native";
import { colorKeyType } from "../../types/colors";

const Container = styled.View`
  position: relative;
  top: 0;
  left: 0;
  flex: 1;
  overflow: hidden;
`;

interface Position {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface CircleProps {
  size: number;
  position: Position;
  color: colorKeyType;
}

const Circle = styled.View<CircleProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  position: absolute;
  ${({ position: { left } }) => (left !== undefined ? `left: ${left}px` : "")}
  ${({ position: { top } }) => (top !== undefined ? `top: ${top}px` : "")}
  ${({ position: { bottom } }) =>
    bottom !== undefined ? `bottom: ${bottom}px` : ""}
  ${({ position: { right } }) =>
    right !== undefined ? `right: ${right}px` : ""}
  
  border-radius: ${({ size }) => `${size / 2}px`};
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

interface Props {
  children: React.ReactNode;
  circles: CircleProps[];
}

const BackgroundCircle: React.FC<Props> = ({ children, circles }) => {
  return (
    <Container>
      {circles.map((circle, i) => (
        <Circle
          key={i}
          position={circle.position}
          color={circle.color}
          size={circle.size}
        />
      ))}
      {children}
    </Container>
  );
};

export default BackgroundCircle;
