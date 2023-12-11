import React from "react";
import { Stack, XStack } from "tamagui";
import { Title } from "../common/Typograph/Title";
import { useAuth } from "@src/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  getCommunity,
  listUserCommunities,
} from "@src/services/communities-services";
import { ChannelsList } from "../community-channel/ChannelsList";
import { Divider } from "../common/Layout/Divider";
import { Dimensions } from "react-native";
import { listCommunityMembers } from "@src/services/users-services";
import { XCommunitiesList } from "@src/screens/Community/XCommunitiesList";
import styled from "styled-components/native";
import { UsersList } from "../user/UsersList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@src/types/navigation/protectedRoutes";
import { User } from "@src/models/User";
import { CommunityChannel } from "@src/models/CommunityChannel";
import { Community } from "@src/models/Community";
import { CommunityDrawerOptions } from "./CommunityDrawerOptions";

interface Props {
  communityId: number;
  closeDrawer(): void;
}

export const CommunityDrawer: React.FC<Props> = ({
  communityId,
  closeDrawer,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigation>();

  const { data: community } = useQuery(["community", communityId], () =>
    getCommunity(communityId)
  );

  const { data: membersResponse } = useQuery(
    ["community-members", communityId],
    () => listCommunityMembers(communityId)
  );

  const { data: communities } = useQuery(
    ["user-communities", user?.id],
    () => listUserCommunities(user?.id ?? 0),
    {
      enabled: !!user,
    }
  );

  const members = membersResponse?.results ?? [];

  const onSelectUser = (user: User) => {
    closeDrawer();
    navigation.navigate("Profile", {
      userId: user.id,
    });
  };
  const onSelectChannel = ({
    communityId,
    id: channelId,
  }: CommunityChannel) => {
    closeDrawer();
    navigation.navigate("CommunityChannel", {
      channelId,
      communityId,
    });
  };

  const onSelectCommunity = ({ id }: Community) => {
    closeDrawer();
    navigation.navigate("Community", {
      id,
    });
  };

  return (
    <Stack space="$4">
      <XStack ai={"center"} jc={"space-between"}>
        <Title color="primary">{community?.name}</Title>
        <CommunityDrawerOptions community={community} />
      </XStack>
      <Stack space="$4">
        <Box>
          <Title size={20} color="secondary">
            Chats
          </Title>

          <ChannelsList
            communityChannels={community?.communityChannels ?? []}
            onSelectChannel={onSelectChannel}
          />
        </Box>

        <Divider color="primary" />

        <Box>
          <Title size={20} color="secondary">
            Membros
          </Title>
          <UsersList onSelectUser={onSelectUser} users={members} />
        </Box>

        <Divider />

        <Box>
          <Title size={20} color="secondary">
            Outras comunidades
          </Title>
          <XCommunitiesList
            communities={communities ?? []}
            onSelectCommunity={onSelectCommunity}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

const utilSpace = Dimensions.get("window").height - 228;

const boxHeight = Math.ceil(utilSpace / 3);

const Box = styled.View`
  gap: 16px;

  height: ${boxHeight}px;
`;
