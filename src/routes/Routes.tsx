import { useAuth } from "@src/hooks/useAuth";
import React from "react";
import FreeRoutes from "./FreeRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Spinner, YStack } from "tamagui";
import { useTheme } from "styled-components";

export const Routes = () => {
  const { signedIn, isCheckingToken } = useAuth();
  const { colors } = useTheme();
  if (isCheckingToken) {
    return (
      <YStack ai={"center"} jc={"center"} flex={1}>
        <Spinner size="large" color={colors.primary} />
      </YStack>
    );
  }

  return signedIn ? <ProtectedRoutes /> : <FreeRoutes />;
};
