import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  AllCommunities: undefined;
  Community: {
    id: number;
  };
};

export type ProtectedRoute = NativeStackNavigationProp<RootStackParamList>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
