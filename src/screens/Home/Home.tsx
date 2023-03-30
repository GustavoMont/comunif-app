import { Button, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@src/hooks/useAuth";

export const Home = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
