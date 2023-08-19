import React from "react";
import "jest-styled-components/native";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("expo-secure-store", () => ({}));

jest.mock("@src/components/common/Typograph/Link", () => ({
  ...jest.requireActual("@src/components/common/Typograph/Link"),
  Link({ children, ...props }: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Text } = require("react-native");
    return <Text {...props}>{children}</Text>;
  },
}));
