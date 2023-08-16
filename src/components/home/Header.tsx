import React from "react";
import { Title } from "../common/Typograph/Title";
import { User } from "@src/models/User";
import { XStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { ProtectedRoute } from "@src/types/navigation/protectedRoutes";
import { UserIcon } from "react-native-heroicons/outline";
import { Avatar } from "../common/Content/Avatar";

interface Props {
  user: User;
}

export const Header: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation<ProtectedRoute>();
  return (
    <XStack ai={"center"} jc={"space-between"}>
      <Title size={20} color="primary">
        Bem vindo(a), {user.name}
      </Title>

      <Avatar
        testID="profile-button"
        onPress={() => {
          navigation.navigate("Profile");
        }}
        fallback={{
          backgroundColor: "darkPrimary",
          icon: UserIcon,
        }}
        src={user.avatar}
      />
    </XStack>
  );
};
