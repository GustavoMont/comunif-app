import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type FreeStackRoutes = {
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ConfirmCode: undefined;
  ChangePassword: undefined;
};

export type ConfirmCodeScreenProps = NativeStackScreenProps<
  FreeStackRoutes,
  "ConfirmCode"
>;

export type ChangePasswordScreenProps = NativeStackScreenProps<
  FreeStackRoutes,
  "ChangePassword"
>;
