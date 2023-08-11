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
  CommunityChannel: {
    communityId: number;
    channelId: number;
  };
};

export type ProtectedRoute = NativeStackNavigationProp<RootStackParamList>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type AllCommunitiesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AllCommunities"
>;

export type CommunityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Community"
>;
