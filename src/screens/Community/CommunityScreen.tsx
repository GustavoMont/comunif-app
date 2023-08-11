import BackgroundCircle from "@src/components/common/Layout/BackgroundCircle";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { Title } from "@src/components/common/Typograph/Title";
import { ChannelItem } from "@src/components/community-channel/ChannelItem";
import { CommunityHeader } from "@src/components/community/CommunityHeader";
import { getCommunity } from "@src/services/communities-services";
import { CircleProps } from "@src/types/components/BackgroundCircle";
import { CommunityScreenProps } from "@src/types/navigation/protectedRoutes";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import { Dimensions, FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { Separator, Spinner, View, YStack } from "tamagui";

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

  useEffect(() => {
    if (community) {
      if (!community.isMember) {
        navigation.navigate("AllCommunities");
      }
    }
  }, [community]);

  return (
    <BackgroundCircle circles={circles}>
      <FullScreenContainer>
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
              <BodyText color="primary">
                <BodyText color="primary" weight={600}>
                  Assunto:{" "}
                </BodyText>
                {community.subject}
              </BodyText>
              <Separator
                mt={"$2"}
                mb={"$4"}
                borderColor={colors.lightPrimary}
              />
              <YStack space={"$4"}>
                <Title size={20} color="secondary">
                  Chats
                </Title>
                <FlatList
                  data={community.communityChannels}
                  renderItem={({ item }) => (
                    <ChannelItem
                      onPress={({ communityId, id }) => {
                        navigation.navigate("CommunityChannel", {
                          channelId: id,
                          communityId,
                        });
                      }}
                      channel={item}
                    />
                  )}
                  ItemSeparatorComponent={() => <View mb="$5" />}
                  keyExtractor={({ id }) => id.toString()}
                />
              </YStack>
            </View>
          </>
        ) : (
          <></>
        )}
      </FullScreenContainer>
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

const circleSize = Dimensions.get("screen").width * 0.66;

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
