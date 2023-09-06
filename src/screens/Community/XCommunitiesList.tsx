import { CommunityStory } from "@src/components/community/CommunityStory";
import { Community } from "@src/models/Community";
import React from "react";
import { FlatList } from "react-native";
import { View } from "tamagui";

interface Props {
  communities: Community[];
  onSelectCommunity(community: Community): void;
}

export const XCommunitiesList: React.FC<Props> = ({
  communities,
  onSelectCommunity,
}) => {
  return (
    <FlatList
      data={communities}
      renderItem={({ item }) => (
        <CommunityStory community={item} onPress={onSelectCommunity} />
      )}
      horizontal
      keyExtractor={({ id }) => id.toString()}
      ItemSeparatorComponent={() => <View ml={"$4"} />}
    />
  );
};
