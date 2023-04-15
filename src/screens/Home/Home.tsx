import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@src/hooks/useAuth";
import { socket } from "@src/config/axios";
import { BodyText } from "@src/components/common/Typograph/BodyText";

export const Home = () => {
  const { logout, user } = useAuth();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket.connected) {
      console.log("AAAAAAAAAAAAa");
      socket.emit("joinRooms", {
        userId: user?.id,
      });
    }
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <>
            <BodyText>{item}</BodyText>
          </>
        )}
      />
      <Button
        title="Message"
        onPress={() => socket.emit("messageToServer", "é jhonsonkkkk")}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
