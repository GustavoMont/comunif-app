import React from "react";
import { FlatList } from "react-native";
import { ChannelItem } from "./ChannelItem";
import { View } from "tamagui";
import { CommunityChannel } from "@src/models/CommunityChannel";

interface Props {
  communityChannels: CommunityChannel[];
  onSelectChannel?(channel: CommunityChannel): void;
}

export const ChannelsList: React.FC<Props> = ({
  communityChannels,
  onSelectChannel,
}) => {
  return (
    <>
      <FlatList
        data={communityChannels}
        renderItem={({ item }) => (
          <ChannelItem onPress={onSelectChannel} channel={item} />
        )}
        ItemSeparatorComponent={() => <View mb="$5" />}
        keyExtractor={({ id }) => id.toString()}
      />
    </>
  );
};
