import { Community } from "@src/models/Community";
import React from "react";
import { UserGroupIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { Avatar, YStack } from "tamagui";
import { BodyText } from "@components/common/Typograph/BodyText";
import { apiUrl } from "@src/constants/api-constants";

interface Props {
  community: Community;
  onPress(community: Community): void;
}

export const CommunityStory: React.FC<Props> = ({ community, onPress }) => {
  const { colors, icons } = useTheme();
  return (
    <YStack
      accessibilityRole={"button"}
      ai={"center"}
      space={"$1"}
      onPress={() => onPress(community)}
    >
      <Avatar circular size="$8">
        <Avatar.Image
          accessibilityLabel="Cam"
          source={{
            uri: `${apiUrl}/${community.banner}` ?? "https://anana.nanan",
          }}
        />
        <Avatar.Fallback
          jc={"center"}
          ai={"center"}
          backgroundColor={colors.darkPrimary}
        >
          <UserGroupIcon
            width={icons.size.large}
            height={icons.size.large}
            color={colors.white}
          />
        </Avatar.Fallback>
      </Avatar>
      <BodyText>{community.name}</BodyText>
    </YStack>
  );
};
