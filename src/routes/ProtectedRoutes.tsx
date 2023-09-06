import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@src/screens/Home/Home";
import { RootStackParamList } from "@src/types/navigation/protectedRoutes";
import { AllCommunitiesScreen } from "@screens/AllCommunities/AllCommunitiesScreen";
import { CommunityScreen } from "@src/screens/Community/CommunityScreen";
import { ProfileScreen } from "@src/screens/Profile/ProfileScreen";
import { CommunityChannelScreen } from "@src/screens/Community/CommunityChannel/CommunityChannelScreen";
import { EditProfileScreen } from "@src/screens/EditProfile/EditProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ProtectedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllCommunities" component={AllCommunitiesScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="CommunityChannel"
        component={CommunityChannelScreen}
      />
    </Stack.Navigator>
  );
};
