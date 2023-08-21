import React from "react";
import { Avatar, ButtonText, YStack } from "tamagui";
import { Title } from "@components/common/Typograph/Title";
import { Community } from "@src/models/Community";
import styled, { useTheme } from "styled-components/native";
import { BodyText } from "../common/Typograph/BodyText";
import { Button } from "@components/common/Buttons/Button";
import { UserGroupIcon } from "react-native-heroicons/outline";

interface Props {
  community: Community;
  onAccess(community: Community): void;
  onTurnMember(community: Community): void;
  isRequestingButton?: boolean;
}

export const CommunityCard: React.FC<Props> = ({
  community,
  onAccess,
  onTurnMember,
  isRequestingButton,
}) => {
  const { colors } = useTheme();

  return (
    <Card isMember={community.isMember} testID="community-card">
      <Avatar size={96} testID="community-banner">
        <Avatar.Image
          borderRadius={"$2"}
          source={{
            uri: community.banner ?? "http://local",
          }}
        />
        <Avatar.Fallback ai={"center"} jc={"center"}>
          <BannerFallback>
            <UserGroupIcon width={24} height={24} color={colors.white} />
          </BannerFallback>
        </Avatar.Fallback>
      </Avatar>
      <YStack maxWidth={"80%"} w={"70%"} space={"$3"} jc={"space-between"}>
        <YStack space={"$1"}>
          <Title
            size={20}
            weight={300}
            color={community.isMember ? "white" : "secondary"}
          >
            {community.name}
          </Title>
          <BodyText>Assunto: {community.subject}</BodyText>
        </YStack>
        <Button
          isLoading={isRequestingButton}
          color={community.isMember ? "secondary" : "primary"}
          alignSelf="flex-end"
          minSize
          onPress={() => {
            if (community.isMember) {
              onAccess(community);
            } else {
              onTurnMember(community);
            }
          }}
        >
          <ButtonText>
            {community.isMember ? "Acessar" : "Virar membro"}
          </ButtonText>
        </Button>
      </YStack>
    </Card>
  );
};

interface CardProps {
  isMember: boolean;
}

const Card = styled.View<CardProps>`
  background-color: ${({ theme: { backgroundScreen, colors }, isMember }) =>
    isMember ? colors.primary : backgroundScreen};
  border-radius: 8px;
  gap: 10px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const BannerFallback = styled.View`
  background-color: ${({ theme: { colors } }) => colors.secondary};
  height: 100%;
  width: 100%;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
