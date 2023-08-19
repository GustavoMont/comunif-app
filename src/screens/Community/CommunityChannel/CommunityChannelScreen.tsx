import { CommunityChannelProps } from "@src/types/navigation/protectedRoutes";
import React, { useEffect, useState } from "react";
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
import { socket } from "@src/config/axios";
import { Message as IMessage } from "@src/models/Model";
import { useAuth } from "@src/hooks/useAuth";
import { FlatList } from "react-native";
import { Message } from "@src/components/Chat/Message";
import { JoinChannelPayload } from "@src/models/Form/Socket/JoinChannelPayload";

export const CommunityChannelScreen: React.FC<CommunityChannelProps> = ({
  route,
  navigation,
}) => {
  const {
    params: { communityId, channelId },
  } = route;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useAuth();
  type MessagePayload = Pick<
    IMessage,
    "content" | "communityChannelId" | "userId"
  >;
  const { control, watch, handleSubmit, resetField } = useForm<MessagePayload>({
    defaultValues: {
      communityChannelId: channelId,
      userId: user?.id,
    },
  });
  const hasMessage = !!watch("content");

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
  const sendMessage = (message: MessagePayload) => {
    socket.emit("message-channel", message);
    resetField("content");
  };

  useEffect(() => {
    if (community && !community.isMember) {
      navigation.navigate("AllCommunities");
    }
  }, [community]);

  useEffect(() => {
    socket.connect();
    const payload: JoinChannelPayload = { communityChannelId: channelId };
    socket.emit("join-channel", payload, (messages: IMessage[]) => {
      setMessages(messages);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage = (message: IMessage) => {
      setMessages((prev) => [message, ...prev]);
    };
    socket.on("message-channel", onMessage);
    return () => {
      socket.off("message-channel", onMessage);
    };
  }, []);
  return (
    <KeyboardCloser>
      <YStack flex={1} pb={"$2"}>
        <CommunityChannelHeader
          onPressBack={() =>
            navigation.navigate("Community", {
              id: communityId,
            })
          }
          community={community}
          channelName={communityChannel?.channelType.name ?? ""}
        />
        <YStack py={"$4"} px={"$1"} flex={1}>
          <FlatList
            inverted
            data={messages}
            renderItem={({ item }) => <Message message={item} />}
            keyExtractor={({ id }) => String(id)}
            ItemSeparatorComponent={() => <View my={"$2"} />}
          />
        </YStack>
        <XStack space={"$2"} ai={"center"} pb={"$0"}>
          <View flex={1}>
            <ControledInput
              placeholder="Digite sua mensagem...."
              control={control}
              name="content"
            />
          </View>
          <Button
            color={hasMessage ? "primary" : "darkWhite"}
            accessibilityLabel="Enviar mensagem"
            disabled={!hasMessage}
            minSize
            alignSelf="flex-start"
            onPress={handleSubmit(sendMessage)}
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
