import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@src/screens/Home/Home";
import { RootStackParamList } from "@src/types/navigation/protectedRoutes";
import { AllCommunitiesScreen } from "@screens/AllCommunities/AllCommunitiesScreen";
import { CommunityScreen } from "@src/screens/Community/CommunityScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ProtectedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllCommunities" component={AllCommunitiesScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
    </Stack.Navigator>
  );
};
