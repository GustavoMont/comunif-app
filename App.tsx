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
