import React from "react";
import { StyleSheet } from "react-native";
import { colorKeyType } from "src/types/colors";
import styled from "styled-components/native";
import { XStack } from "tamagui";

type statusType = "todo" | "progress" | "done";

interface CircleProps {
  status: statusType;
  size: number;
}

type handlStepColorType = (status: statusType) => colorKeyType;

const handleStepColor: handlStepColorType = (status: statusType) => {
  switch (status) {
    case "progress":
      return "secondary";
    case "done":
      return "primary";
    default:
      return "darkWhite";
  }
};

const Circle = styled.View<CircleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ status, theme: { colors } }) =>
    colors[handleStepColor(status)]};
`;

const Pill = styled.View<CircleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size * 0.18}px;
  border-radius: 999px;
  background-color: ${({ status, theme: { colors } }) =>
    colors[handleStepColor(status)]};
`;

interface Props {
  size: number;
  stepsQuantity: number;
  currentStep: number;
}

export const Steps: React.FC<Props> = ({
  size,
  stepsQuantity,
  currentStep,
}) => {
  type handleStepStatus = (currentStep: number, index: number) => statusType;

  const handleStepStatus: handleStepStatus = (
    currentStep: number,
    index: number
  ) => {
    if (index === currentStep) {
      return "progress";
    } else if (index < currentStep) {
      return "done";
    } else {
      return "todo";
    }
  };
  return (
    <XStack gap={"$0.5"}>
      {Array.from({ length: stepsQuantity }, () => Math.random()).map(
        (step, i, steps) => {
          const status = handleStepStatus(currentStep, i);
          return (
            <XStack
              testID="step"
              key={i.toString()}
              gap={2}
              style={styles.stepsContainer}
            >
              <Circle testID="step-circle" size={size} status={status} />
              {i < steps.length - 1 && (
                <Pill testID="step-conector" size={size} status={status} />
              )}
            </XStack>
          );
        }
      )}
    </XStack>
  );
};

const styles = StyleSheet.create({
  stepsContainer: { alignItems: "center" },
});
