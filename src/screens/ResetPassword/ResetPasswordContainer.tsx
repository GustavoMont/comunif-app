import React, { PropsWithChildren } from "react";
import BackgroundCircle from "@src/components/common/Layout/BackgroundCircle";
import { Dimensions } from "react-native";

export const ResetPasswordContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  return (
    <BackgroundCircle
      useAnimation={false}
      circles={[
        {
          color: "primary",
          position: {
            bottom: screenHeight - 280,
            left: -80,
          },
          size: screenWidth * 0.4125,
        },
        {
          color: "lightSecondary",
          position: {
            bottom: screenHeight - 200,
            left: -150,
          },
          size: screenWidth * 0.82,
        },
        {
          color: "lightSecondary",
          position: {
            bottom: 80,
            right: -100,
          },
          size: screenWidth * 0.4125,
        },
        {
          color: "primary",
          position: {
            bottom: -200,
            right: -150,
          },
          size: screenWidth * 0.82,
        },
      ]}
    >
      {children}
    </BackgroundCircle>
  );
};
