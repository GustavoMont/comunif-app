import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { useAuth } from "@src/hooks/useAuth";
import React from "react";
import { Button } from "tamagui";

export const ProfileScreen = () => {
  const { logout } = useAuth();
  return (
    <FullScreenContainer>
      <Button onPress={logout}>Logout</Button>
    </FullScreenContainer>
  );
};
