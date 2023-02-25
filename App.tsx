import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, UIManager, View } from "react-native";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { light } from "./src/styles/themes/light";
import SignIn from "./src/screens/SignIn";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";
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

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Sign In" component={SignIn} />
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
