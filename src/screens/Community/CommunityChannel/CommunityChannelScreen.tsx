import { CommunityChannelProps } from "@src/types/navigation/protectedRoutes";
import React, { useEffect, useState } from "react";
import { Spinner, View, XStack, YStack } from "tamagui";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCommunity } from "@src/services/communities-services";
import { CommunityChannelHeader } from "@src/components/community-channel/CommunityChannelHeader";
import { Button } from "@components/common/Buttons/Button";
import { PaperAirplaneIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { useForm } from "react-hook-form";
import { ControledInput } from "@src/components/common/Form/ControledInput";
import { socket } from "@src/config/axios";
import { Message as IMessage } from "@src/models/Message";
import { useAuth } from "@src/hooks/useAuth";
import { FlatList } from "react-native";
import { Message } from "@src/components/Chat/Message";
import { JoinChannelPayload } from "@src/models/Form/Socket/JoinChannelPayload";
import { listChannelMessages } from "@src/services/messages-services";

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
    data: response,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", channelId],
    queryFn: ({ pageParam: page = 1 }) =>
      listChannelMessages(channelId, { page }),
    getNextPageParam: ({ meta }) => {
      return meta.page < meta.pages ? meta.page + 1 : undefined;
    },
  });

  const oldMessages = response?.pages.flatMap((page) => page.results) ?? [];

  const allMessages = oldMessages
    .filter((old) => !messages.some((message) => old.id === message.id))
    .concat(messages);

  const {
    icons: { size },
    colors,
    backgroundScreen,
  } = useTheme();
  const communityChannel = community?.communityChannels.find(
    ({ id }) => id === channelId
  );
  const sendMessage = (message: MessagePayload) => {
    socket.emit("message-channel", message);
    resetField("content");
  };
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (community && !community.isMember) {
      navigation.navigate("AllCommunities");
    }
  }, [community]);

  useEffect(() => {
    socket.connect();
    const payload: JoinChannelPayload = { communityChannelId: channelId };
    socket.emit("join-channel", payload);
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
    <YStack flex={1} pb={"$2"} backgroundColor={backgroundScreen}>
      <CommunityChannelHeader
        onPressBack={() =>
          navigation.navigate("Community", {
            id: communityId,
          })
        }
        community={community}
        channelName={communityChannel?.channelType.name ?? ""}
      />

      <View py={"$2"} px={"$1"} flex={1}>
        <FlatList
          data={allMessages}
          inverted
          renderItem={({ item, index }) => (
            <>
              <Message
                message={item}
                isCurrentUser={user?.id === item.userId}
                onPressUser={(user) =>
                  navigation.navigate("Profile", { userId: user.id })
                }
              />
              {isFetchingNextPage && index === allMessages.length - 1 ? (
                <Spinner size="large" color={"$green10"} />
              ) : (
                <></>
              )}
            </>
          )}
          keyExtractor={({ id }) => String(id)}
          ItemSeparatorComponent={() => <View my={"$2"} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
        />
      </View>
      <XStack px={"$2"} space={"$2"} ai={"center"} pb={"$0"}>
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
  );
};
