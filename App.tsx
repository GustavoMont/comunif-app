import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, UIManager } from "react-native";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { light } from "./src/styles/themes/light";
import { SafeAreaProvider } from "react-native-safe-area-context";
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

import { Routes } from "@src/routes/Routes";
import { AuthProvider } from "@src/contexts/auth";

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
    <>
      <StatusBar style="light" backgroundColor={colors["lightBlack"]} />
      <ThemeProvider theme={light}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
