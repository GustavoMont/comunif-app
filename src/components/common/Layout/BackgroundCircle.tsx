import React from "react";
import { LayoutAnimation } from "react-native";
import styled from "styled-components/native";
import {
  CircleProps,
  Position,
} from "../../../types/components/BackgroundCircle";

const Container = styled.View`
  position: relative;
  top: 0;
  left: 0;
  flex: 1;
  overflow: hidden;
  background-color: ${({ theme: { backgroundScreen } }) => backgroundScreen};
`;

const Circle = styled.View<CircleProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  position: absolute;
  ${({ position: { left } }) => (left !== undefined ? `left: ${left}px;` : "")}
  ${({ position: { top } }) => (top !== undefined ? `top: ${top}px;` : "")}
  ${({ position: { bottom } }) =>
    bottom !== undefined ? `bottom: ${bottom}px;` : ""}
  ${({ position: { right } }) =>
    right !== undefined ? `right: ${right}px;` : ""}

  border-radius: ${({ size }) => `${size / 2}px`};
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

interface Props {
  children: React.ReactNode;
  circles: CircleProps[];
  positions?: Position[];
  useAnimation?: boolean;
}

const BackgroundCircle: React.FC<Props> = ({
  children,
  circles,
  positions,
  useAnimation = true,
}) => {
  if (useAnimation) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  return (
    <Container>
      {circles.map((circle, i) => (
        <Circle
          key={i}
          position={positions ? positions[i] : circle.position}
          color={circle.color}
          size={circle.size}
        />
      ))}
      {children}
    </Container>
  );
};

export default BackgroundCircle;
