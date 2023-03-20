import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackRoutes = {
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type FreeRoutesStack = NativeStackNavigationProp<RootStackRoutes>;
