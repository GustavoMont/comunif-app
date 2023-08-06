import React from "react";
import { Title } from "../common/Typograph/Title";
import { User } from "@src/models/User";
import { Avatar, XStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { ProtectedRoute } from "@src/types/navigation/protectedRoutes";
import { UserIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";

interface Props {
  user: User;
}

export const Header: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation<ProtectedRoute>();
  const { colors } = useTheme();
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
        circular
        size={"$5"}
      >
        <Avatar.Image
          source={{
            uri: user.avatar ?? "https://amala.naio",
          }}
        />
        <Avatar.Fallback
          ai={"center"}
          jc={"center"}
          delayMs={600}
          backgroundColor={colors.darkPrimary}
        >
          <UserIcon width={24} height={24} color={colors.white} />
        </Avatar.Fallback>
      </Avatar>
    </XStack>
  );
};
