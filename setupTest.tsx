import React from "react";
import "jest-styled-components/native";

jest.mock("react-native-reanimated", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const View = require("react-native").View;

  return {
    View,
    useAnimatedStyle: jest.fn(),
    useSharedValue: (arg: unknown) => ({
      value: arg,
    }),
    withSpring: jest.fn(),
    withTiming: jest.fn(),
    Easing: {
      inOut: jest.fn(),
    },
  };
});

jest.mock("expo-secure-store", () => ({}));

jest.mock("@src/components/common/Typograph/Link", () => ({
  ...jest.requireActual("@src/components/common/Typograph/Link"),
  Link({ children, ...props }: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Text } = require("react-native");
    return <Text {...props}>{children}</Text>;
  },
}));
