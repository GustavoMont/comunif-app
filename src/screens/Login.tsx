import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundCircle from "../components/common/BackgroundCircle";

interface HandlePositionParams {
  size: number;
  showPercentage: number;
}

const handlePosition = ({ size, showPercentage }: HandlePositionParams) =>
  -size + size * showPercentage;

const Login = () => {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackgroundCircle
        circles={[
          {
            color: "lightSecondary",
            position: {
              left: handlePosition({
                size: width * 0.41,
                showPercentage: 0.42,
              }),
              top: width * 0.11,
            },
            size: Math.round(width) * 0.41,
          },
          {
            color: "primary",
            position: {
              left: handlePosition({
                size: width * 0.84,
                showPercentage: 0.51,
              }),
              top: handlePosition({
                size: width * 0.84,
                showPercentage: 0.43,
              }),
            },
            size: Math.round(width) * 0.84,
          },
          {
            color: "lightSecondary",
            position: {
              bottom: height * 0.1,
              right: handlePosition({
                showPercentage: 0.4,
                size: width * 0.41,
              }),
            },
            size: Math.round(width) * 0.41,
          },
          {
            color: "primary",
            position: {
              right: handlePosition({
                size: width * 0.84,
                showPercentage: 0.51,
              }),
              bottom: handlePosition({
                size: width * 0.84,
                showPercentage: 0.43,
              }),
            },
            size: width * 0.84,
          },
        ]}
      >
        <View>
          <Text>A</Text>
        </View>
      </BackgroundCircle>
    </SafeAreaView>
  );
};

export default Login;
