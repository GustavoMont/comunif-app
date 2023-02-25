import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const FullScreenContainer: React.FC<{ children: any }> = ({
  children,
}) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};
