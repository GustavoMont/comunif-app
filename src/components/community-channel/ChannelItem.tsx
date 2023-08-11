import React from "react";
import { XStack, YStack } from "tamagui";
import { BodyText } from "@components/common/Typograph/BodyText";
import { CommunityChannel } from "@src/models/CommunityChannel";
import { ChannelItemIcon } from "./ChannelItemIcon";

interface Props {
  channel: CommunityChannel;
  onPress(channel: CommunityChannel): void;
}

export const ChannelItem: React.FC<Props> = ({ channel, onPress }) => {
  return (
    <YStack
      onPress={() => onPress(channel)}
      accessibilityRole="button"
      accessibilityLabel="Canal da comunidade"
      testID="channel-item"
    >
      <XStack space={"$1"} ai={"center"}>
        <ChannelItemIcon typeName={channel.channelType.name} />
        <BodyText underlined size={20} color="secondary">
          {channel.channelType.name}
        </BodyText>
      </XStack>
      <BodyText size={14} color="lightSecondary" weight={500}>
        {channel.channelType.description}
      </BodyText>
    </YStack>
  );
};
