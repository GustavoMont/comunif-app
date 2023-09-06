import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

export const FullScreenContainer: React.FC<{ children: any }> = ({
  children,
}) => {
  const { backgroundScreen } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundScreen }]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: "relative",
  },
});
