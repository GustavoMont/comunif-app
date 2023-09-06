import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: {
    userId: number;
  };
  EditProfile: undefined;
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

export type CommunityChannelProps = NativeStackScreenProps<
  RootStackParamList,
  "CommunityChannel"
>;

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile"
>;

export type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;
