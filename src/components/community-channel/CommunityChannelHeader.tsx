import { Community } from "@src/models/Community";
import React from "react";
import styled from "styled-components/native";

import { Title } from "../common/Typograph/Title";
import { YStack } from "tamagui";
import { BodyText } from "@components/common/Typograph/BodyText";
import { Avatar } from "@components/common/Content/Avatar";
import { ChevronLeftIcon, UserGroupIcon } from "react-native-heroicons/outline";
import { IconButton } from "../common/Buttons/IconButton";

interface Props {
  community?: Community;
  channelName: string;
  onPressBack(): void;
}

export const CommunityChannelHeader: React.FC<Props> = ({
  community,
  channelName,
  onPressBack,
}) => {
  return (
    <Container>
      <IconButton
        accessibilityLabel="Voltar"
        onPress={onPressBack}
        iconColor="white"
        iconSize={24}
        icon={ChevronLeftIcon}
      />
      <Avatar
        testID="community-pic"
        fallback={{
          backgroundColor: "secondary",
          icon: UserGroupIcon,
        }}
        src={community?.banner ?? undefined}
      />
      <YStack>
        <Title color="white" size={20} weight={400}>
          {community?.name}
        </Title>
        <BodyText color="white">{channelName}</BodyText>
      </YStack>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({ theme: { colors } }) => colors.darkPrimary};
  height: 64px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
`;
