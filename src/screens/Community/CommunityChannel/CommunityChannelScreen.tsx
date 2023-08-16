import { CommunityChannelProps } from "@src/types/navigation/protectedRoutes";
import React, { useEffect } from "react";
import { View, XStack, YStack } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "@src/services/communities-services";
import { CommunityChannelHeader } from "@src/components/community-channel/CommunityChannelHeader";
import { Button } from "@components/common/Buttons/Button";
import { PaperAirplaneIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { useForm } from "react-hook-form";
import { ControledInput } from "@src/components/common/Form/ControledInput";
import { KeyboardCloser } from "@src/components/common/Layout/KeyboardCloser";
export const CommunityChannelScreen: React.FC<CommunityChannelProps> = ({
  route,
  navigation,
}) => {
  interface Message {
    message: string;
  }
  const { control, watch } = useForm<Message>();
  const hasMessage = !!watch("message");
  const {
    params: { communityId, channelId },
  } = route;
  const { data: community } = useQuery(["community", communityId], () =>
    getCommunity(communityId)
  );
  const {
    icons: { size },
    colors,
  } = useTheme();
  const communityChannel = community?.communityChannels.find(
    ({ id }) => id === channelId
  );
  useEffect(() => {
    if (community && !community.isMember) {
      navigation.navigate("AllCommunities");
    }
  }, [community]);

  return (
    <KeyboardCloser>
      <YStack flex={1}>
        <CommunityChannelHeader
          onPressBack={() =>
            navigation.navigate("Community", {
              id: communityId,
            })
          }
          community={community}
          channelName={communityChannel?.channelType.name ?? ""}
        />
        <View flex={1} borderColor={"$blue1"} />
        <XStack space={"$1"} ai={"center"} pb={"$0"}>
          <View flex={1}>
            <ControledInput
              placeholder="Digite sua mensgaem...."
              control={control}
              name="message"
            />
          </View>
          <Button
            color={hasMessage ? "primary" : "darkWhite"}
            accessibilityLabel="Enviar mensagem"
            disabled={!hasMessage}
            minSize
            alignSelf="flex-start"
          >
            <PaperAirplaneIcon
              width={size.medium}
              height={size.medium}
              color={hasMessage ? colors.white : colors.lightBlack}
            />
          </Button>
        </XStack>
      </YStack>
    </KeyboardCloser>
  );
};
