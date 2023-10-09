import React, { PropsWithChildren } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";

interface Props {
  itemIndex: number;
}

export const AnimatedListItem: React.FC<PropsWithChildren<Props>> = ({
  itemIndex,
  children,
}) => {
  return (
    <Animated.View entering={FadeInRight.delay(itemIndex * 150).springify()}>
      {children}
    </Animated.View>
  );
};
