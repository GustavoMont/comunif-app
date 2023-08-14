import React, { useState } from "react";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { Title } from "@src/components/common/Typograph/Title";
import {
  ListCommunitiesFilters,
  addUserToCommunity,
  listCommunities,
} from "@services/communities-services";
import { AllCommunitiesScreenProps } from "@src/types/navigation/protectedRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { Button, View, XStack, YStack } from "tamagui";
import { TextInput } from "@components/common/Form/TextInput";
import { debounce } from "lodash";
import { CommunityCard } from "@src/components/community/CommunityCard";
import { Community } from "@src/models/Community";
import { useAppToast } from "@src/hooks/useAppToast";
import { AxiosError } from "axios";

export const AllCommunitiesScreen: React.FC<AllCommunitiesScreenProps> = ({
  navigation,
}) => {
  const [communitiesFilters, setCommunitiesFilters] =
    useState<ListCommunitiesFilters>({});
  const { data: response } = useQuery(["communities", communitiesFilters], () =>
    listCommunities(communitiesFilters)
  );
  const { showToast } = useAppToast();
  const { icons, colors } = useTheme();
  const onChangeSearch = (name: string) => {
    setCommunitiesFilters((prev) => ({
      ...prev,
      name,
    }));
  };

  const onAccess = ({ id }: Community) => {
    navigation.navigate("Community", {
      id,
    });
  };
  const { mutate: turnMember, isLoading: isTurningMember } = useMutation(
    addUserToCommunity,
    {
      onSuccess({ id }) {
        navigation.navigate("Community", {
          id,
        });
      },
      onError(error) {
        const apiError: AxiosError<{ message: string }> = error as any;
        showToast({
          message:
            apiError.response?.data.message ??
            "Erro ao tentar entrar nessa comunidade, tente mais tarde",
          title: "Ocorreu um erro",
          type: "error",
        });
      },
    }
  );

  return (
    <FullScreenContainer>
      <XStack ai={"center"} space={"$2"}>
        <Button
          accessibilityLabel="Voltar"
          px={"$0"}
          backgroundColor={"#0000"}
          onPress={() => navigation.goBack()}
          icon={
            <ChevronLeftIcon
              color={colors.primary}
              width={icons.size.large}
              height={icons.size.large}
            />
          }
        />
        <Title color="primary" size={24}>
          Comunidades
        </Title>
      </XStack>
      <YStack mt={"$6"} space={"$2"} flex={1}>
        <TextInput
          placeholder="pesquisar"
          rightIcon={
            <MagnifyingGlassIcon
              width={icons.size.medium}
              color={colors.lightBlack}
            />
          }
          onChangeText={debounce(onChangeSearch, 400)}
        />
        <FlatList
          data={response?.results}
          renderItem={({ item }) => (
            <CommunityCard
              onAccess={onAccess}
              onTurnMember={({ id }) => turnMember({ communityId: id })}
              community={item}
              isRequestingButton={isTurningMember}
            />
          )}
          keyExtractor={({ id }) => id.toString()}
          ItemSeparatorComponent={() => <View height={"$2"} />}
        />
      </YStack>
    </FullScreenContainer>
  );
};
