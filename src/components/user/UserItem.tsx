import React from "react";
import { Avatar, YStack } from "tamagui";
import { BodyText } from "../common/Typograph/BodyText";
import { User } from "@src/models/User";
import { useTheme } from "styled-components/native";
import { UserIcon } from "react-native-heroicons/outline";

interface Props {
  user: User;
  onPress?(user: User): void;
}

export const UserItem: React.FC<Props> = ({ user, onPress }) => {
  const { colors, icons } = useTheme();
  return (
    <YStack
      accessibilityRole={"button"}
      ai={"center"}
      space={"$1"}
      onPress={() => onPress?.(user)}
    >
      <Avatar circular size="$5">
        <Avatar.Image
          accessibilityLabel="Cam"
          source={{
            uri: user.avatar ?? "https://anana.nanan",
          }}
        />
        <Avatar.Fallback
          jc={"center"}
          ai={"center"}
          backgroundColor={colors.secondary}
        >
          <UserIcon
            width={icons.size.medium}
            height={icons.size.medium}
            color={colors.white}
          />
        </Avatar.Fallback>
      </Avatar>
      <BodyText>
        {user.name} {user.lastName[0]}.
      </BodyText>
    </YStack>
  );
};
