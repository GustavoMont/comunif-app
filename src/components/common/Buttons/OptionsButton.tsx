import React from "react";
import { YStack } from "tamagui";
import { OptionCircle } from "./OptionCircle";

interface Props {
  onPress?(): void;
}

export const OptionsButton: React.FC<Props> = ({ onPress }) => {
  const circles = Array.from({ length: 3 }, (_, i) => i);
  return (
    <YStack
      accessibilityLabel="Opções"
      accessibilityRole="button"
      onPress={onPress}
      space={"$1"}
    >
      {circles.map((key) => (
        <OptionCircle key={key} />
      ))}
    </YStack>
  );
};
