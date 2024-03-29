import React from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox, Platform, StyleSheet, UIManager } from "react-native";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { light } from "./src/styles/themes/light";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "./src/styles/themes/colors";
import { useFonts } from "expo-font";
import {
  Montserrat_500Medium,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import {
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import { ToastProvider } from "@tamagui/toast";
import { CurrentToast } from "@src/components/common/Layout/CurrentToast";
import { Routes } from "@src/routes/Routes";
import { AuthProvider } from "@src/Providers/AuthProviders";
import { PermissionsProvider } from "@src/Providers/PermissionsProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const client = new QueryClient();

LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300: Poppins_300Light,
    Poppins_400: Poppins_400Regular,
    Poppins_500: Poppins_500Medium,
    Poppins_600: Poppins_600SemiBold,
    Montserrat_300: Montserrat_300Light,
    Montserrat_400: Montserrat_400Regular,
    Montserrat_500: Montserrat_500Medium,
    Montserrat_600: Montserrat_600SemiBold,
  });
  if (!fontsLoaded) {
    return <></>;
  }
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <GestureHandlerRootView style={styles.safeArea}>
          <QueryClientProvider client={client}>
            <ThemeProvider theme={light}>
              <TamaguiProvider config={config}>
                <ToastProvider>
                  <CurrentToast />
                  <StatusBar
                    style="light"
                    backgroundColor={colors["lightBlack"]}
                  />
                  <NavigationContainer>
                    <AuthProvider>
                      <PermissionsProvider>
                        <Routes />
                      </PermissionsProvider>
                    </AuthProvider>
                  </NavigationContainer>
                </ToastProvider>
              </TamaguiProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
