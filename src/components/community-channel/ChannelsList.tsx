import React from "react";
import { ChannelItem } from "./ChannelItem";
import { View } from "tamagui";
import { CommunityChannel } from "@src/models/CommunityChannel";
import { AnimatedListItem } from "../common/Content/AnimatedListItem";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  communityChannels: CommunityChannel[];
  onSelectChannel?(channel: CommunityChannel): void;
}

export const ChannelsList: React.FC<Props> = ({
  communityChannels,
  onSelectChannel,
}) => {
  return (
    <Animated.FlatList
      entering={FadeInDown.delay(200)}
      data={communityChannels}
      renderItem={({ item, index }) => (
        <AnimatedListItem itemIndex={index}>
          <ChannelItem onPress={onSelectChannel} channel={item} />
        </AnimatedListItem>
      )}
      ItemSeparatorComponent={() => <View mb="$5" />}
      keyExtractor={({ id }) => id.toString()}
    />
  );
};
