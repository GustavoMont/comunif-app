import BackgroundCircle from "@src/components/common/Layout/BackgroundCircle";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { Title } from "@src/components/common/Typograph/Title";
import { ChannelsList } from "@src/components/community-channel/ChannelsList";
import { CommunityOptions } from "@src/components/community/CommunitOptions";
import { CommunityHeader } from "@src/components/community/CommunityHeader";
import { CommunityChannel } from "@src/models/CommunityChannel";
import { getCommunity } from "@src/services/communities-services";
import { CircleProps } from "@src/types/components/BackgroundCircle";
import { CommunityScreenProps } from "@src/types/navigation/protectedRoutes";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import { Dimensions } from "react-native";
import { useTheme } from "styled-components/native";
import { Separator, Spinner, View, XStack, YStack } from "tamagui";

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  route,
  navigation,
}) => {
  const {
    params: { id: communityId },
  } = route;
  const { colors } = useTheme();
  const {
    data: community,
    isLoading,
    isError,
  } = useQuery(
    ["community", communityId],
    async () => await getCommunity(communityId)
  );

  const onSelectChannel = ({ id, communityId }: CommunityChannel) => {
    navigation.navigate("CommunityChannel", {
      channelId: id,
      communityId,
    });
  };

  useEffect(() => {
    if (community) {
      if (!community.isMember) {
        navigation.navigate("AllCommunities");
      }
    }
  }, [community]);

  return (
    <BackgroundCircle circles={circles}>
      {isError ? <ErrorDisplay /> : <></>}
      {isLoading ? (
        <Center>
          <Spinner accessibilityLabel="Carregando" size="large" />
        </Center>
      ) : (
        <></>
      )}
      {community ? (
        <>
          <CommunityHeader
            onPressBack={navigation.goBack}
            community={community}
          />
          <View pt={176}>
            <XStack jc={"space-between"}>
              <BodyText color="primary">
                <BodyText color="primary" weight={600}>
                  Assunto:{" "}
                </BodyText>
                {community.subject}
              </BodyText>
              <CommunityOptions community={community} />
            </XStack>
            <Separator mt={"$2"} mb={"$4"} borderColor={colors.lightPrimary} />
            <YStack space={"$4"}>
              <Title size={20} color="secondary">
                Chats
              </Title>
              <ChannelsList
                communityChannels={community.communityChannels ?? []}
                onSelectChannel={onSelectChannel}
              />
            </YStack>
          </View>
        </>
      ) : (
        <></>
      )}
    </BackgroundCircle>
  );
};

const Center: React.FC<PropsWithChildren> = ({ children }) => (
  <YStack f={1} ai={"center"} jc={"center"}>
    {children}
  </YStack>
);

const ErrorDisplay: React.FC = () => (
  <Center>
    <Title weight={300}>Comunidade não encontrada</Title>
  </Center>
);

const circleSize = Dimensions.get("screen").width * 0.5;

const circles: CircleProps[] = [
  {
    color: "secondary",
    position: {
      left: -circleSize * 0.34,
      bottom: -circleSize * 0.65,
    },
    size: circleSize,
  },
  {
    color: "lightSecondary",
    position: {
      left: circleSize * 0.31,
      bottom: -circleSize * 0.79,
    },
    size: circleSize,
  },
  {
    color: "lightPrimary",
    position: {
      right: -circleSize * 0.64,
      bottom: -circleSize * 0.39,
    },
    size: circleSize,
  },
];
