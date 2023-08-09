import React from "react";
import { HomeScreenProps } from "@src/types/navigation/protectedRoutes";
import { useQuery } from "@tanstack/react-query";
import { listUserCommunities } from "@src/services/communities-services";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { useAuth } from "@src/hooks/useAuth";
import { Header } from "@src/components/home/Header";
import { Separator, Spinner, View, YStack } from "tamagui";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { useTheme } from "styled-components/native";
import { Button } from "@components/common/Buttons/Button";
import { ButtonText } from "@components/common/Buttons/ButtonText";
import { GlobeAltIcon, PlusIcon } from "react-native-heroicons/outline";
import { Title } from "@src/components/common/Typograph/Title";
import { FlatList } from "react-native";
import { CommunityStory } from "@src/components/community/CommunityStory";

export const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { data: communities, isLoading } = useQuery(
    ["my-communities", user?.id],
    async () => await listUserCommunities(user?.id ?? 0),
    {
      enabled: !!user,
    }
  );
  const isNewUser = communities ? communities?.length === 0 : true;
  const { colors, icons } = useTheme();
  return (
    <FullScreenContainer>
      {user ? <Header user={user} /> : <></>}

      <YStack space={"$5"} flex={1} jc={"center"}>
        {isLoading ? <Spinner color={colors.primary} size="large" /> : <></>}
        {isNewUser ? (
          <BodyText align="center">
            Você não está em nenhuma comunidade
          </BodyText>
        ) : (
          <Title weight={300}>Minhas comunidades:</Title>
        )}
        {!isNewUser ? (
          <View>
            <FlatList
              data={communities}
              renderItem={({ item }) => (
                <CommunityStory
                  community={item}
                  onPress={({ id }) =>
                    navigation.navigate("Community", {
                      id,
                    })
                  }
                />
              )}
              horizontal
              keyExtractor={({ id }) => id.toString()}
              ItemSeparatorComponent={() => <View ml={"$4"} />}
            />
          </View>
        ) : (
          <></>
        )}
        <View w={"80%"} alignSelf="center">
          <Button
            onPress={() => navigation.navigate("AllCommunities")}
            centerContent
            rightIcon={
              <ButtonIconHandler
                color={colors.white}
                isNewUser={isNewUser}
                size={icons.size.medium}
              />
            }
          >
            <ButtonText align="center">
              {isNewUser ? "Buscar comunidades" : "Mais comunidades"}
            </ButtonText>
          </Button>
        </View>
        <Separator borderColor={colors.secondary} w={"100%"} />
      </YStack>
    </FullScreenContainer>
  );
};

interface ButtonIconHandlerProps {
  isNewUser: boolean;
  size: number;
  color: string;
}
const ButtonIconHandler: React.FC<ButtonIconHandlerProps> = ({
  color,
  isNewUser,
  size,
}) => {
  return isNewUser ? (
    <GlobeAltIcon width={size} height={size} color={color} />
  ) : (
    <PlusIcon width={size} height={size} color={color} />
  );
};
