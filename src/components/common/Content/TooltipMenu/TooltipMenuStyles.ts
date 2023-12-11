import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export type TooltipPosition = "left" | "right";

// const generatePositionPadding = (hasPadding = false) =>
//   hasPadding ? "24px" : "0px";

// const handlePositionPadding = (position: TooltipPosition = "right") => {
//   const isRight = position === "right";
//   return `0px ${generatePositionPadding(isRight)} 0px ${generatePositionPadding(
//     !isRight
//   )}`;
// };

export const TooltipContainer = styled.View`
  padding: 0px 24px 0px 0px;
  padding-top: 56px;
  gap: 8px;
`;

const AnimatedView = Animated.View;

export const TooltipContent = styled(AnimatedView)`
  align-self: flex-end;
  border: 1px solid ${({ theme: { colors } }) => colors.darkWhite};
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  gap: 16px;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme: { backgroundScreen } }) => backgroundScreen};
`;
