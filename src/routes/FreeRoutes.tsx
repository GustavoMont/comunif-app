import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@src/screens/Login/Login";
import Signup from "@src/screens/Signup/Signup";
import { ResetPassword } from "@src/screens/ResetPassword/ResetPassword";
import { FreeStackRoutes } from "@src/types/navigation/freeRoutes";
import { ConfirmCode } from "@src/screens/ConfirmCode/ConfirmCode";
import { ChangePasswordScreen } from "@src/screens/ChangePassword/ChangePasswordScreen";

const Stack = createNativeStackNavigator<FreeStackRoutes>();

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
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default FreeRoutes;
