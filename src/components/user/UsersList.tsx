import React from "react";
import { FlatList } from "react-native";
import { User } from "@src/models/User";
import { UserItem } from "./UserItem";
import { View } from "tamagui";
import { StyleSheet } from "react-native";

interface Props {
  users: User[];
  onSelectUser?(user: User): void;
}

export const UsersList: React.FC<Props> = ({ users, onSelectUser }) => {
  return (
    <FlatList
      horizontal
      data={users}
      renderItem={({ item: user }) => (
        <UserItem onPress={onSelectUser} user={user} />
      )}
      keyExtractor={({ id }) => id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View mr="$6" />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexWrap: "wrap",
  },
});
