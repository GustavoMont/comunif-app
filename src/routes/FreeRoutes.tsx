import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@src/screens/Login/Login";
import Signup from "@src/screens/Signup/Signup";
import { ResetPassword } from "@src/screens/ResetPassword/ResetPassword";
import { FreeStackRoutes } from "@src/types/navigation/freeRoutes";
import { ConfirmCode } from "@src/screens/ConfirmCode/ConfirmCode";
import { Text, View } from "native-base";

const Stack = createNativeStackNavigator<FreeStackRoutes>();

const PlaceHolder = () => (
  <View>
    <Text>PLACEHOLDER</Text>
  </View>
);
const FreeRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ResetPassword} />
      <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
      <Stack.Screen name="ChangePassword" component={PlaceHolder} />
    </Stack.Navigator>
  );
};

export default FreeRoutes;
