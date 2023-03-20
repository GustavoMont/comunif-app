import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@src/screens/Login/Login";
import Signup from "@src/screens/Signup/Signup";
import { RootStackRoutes } from "@src/types/navigation/freeRoutes";

const Stack = createNativeStackNavigator<RootStackRoutes>();

function Placeholder() {
  return (
    <View>
      <Text>Essa tela ainda não existe</Text>
    </View>
  );
}

const FreeRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={Placeholder} />
    </Stack.Navigator>
  );
};

export default FreeRoutes;
