import { IconButton } from "@src/components/common/Buttons/IconButton";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { Title } from "@src/components/common/Typograph/Title";
import { useAuth } from "@src/hooks/useAuth";
import { getUser } from "@services/users-services";
import { ProfileScreenProps } from "@src/types/navigation/protectedRoutes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { Spinner, YStack } from "tamagui";
import { ProfileHeader } from "@src/components/profile/ProfileHeader";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { XCommunitiesList } from "../Community/XCommunitiesList";
import { listUserCommunities } from "@src/services/communities-services";
import { Button } from "@src/components/common/Buttons/Button";
import { ButtonText } from "@src/components/common/Buttons/ButtonText";
import { useTheme } from "styled-components/native";

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    params: { userId },
  } = route;
  const { logout, user: currentUser } = useAuth();
  const { icons, colors } = useTheme();
  const {
    data: profile,
    isInitialLoading: isLoading,
    isError,
  } = useQuery(["user", userId], () => getUser(userId));
  const isCurrentUser = profile?.id === currentUser?.id;
  const { data: userCommunities } = useQuery(
    ["user-communities", userId],
    () => listUserCommunities(userId),
    {
      enabled: !!profile,
    }
  );
  if (isLoading) {
    return (
      <FullScreenContainer>
        <YStack flex={1} jc={"center"} ai={"center"}>
          <Spinner size="large" />
        </YStack>
      </FullScreenContainer>
    );
  } else if (isError || !profile) {
    return (
      <FullScreenContainer>
        <IconButton
          accessibilityLabel="Voltar"
          icon={ChevronLeftIcon}
          iconColor="primary"
          iconSize={24}
        />
        <YStack ai={"center"} jc={"center"} flex={1}>
          <Title color="secondary">Usuário não encontrado</Title>
        </YStack>
      </FullScreenContainer>
    );
  }

  return (
    <FullScreenContainer>
      <IconButton
        onPress={() => navigation.push("Home")}
        accessibilityLabel="Voltar"
        icon={ChevronLeftIcon}
        iconColor="primary"
        iconSize={24}
      />
      <YStack flex={1} space={"$4"}>
        <ProfileHeader
          onPressEdit={() => navigation.navigate("EditProfile")}
          user={profile}
        />
        <YStack space={"$2"}>
          <Title weight={400} color="lightSecondary">
            Bio
          </Title>
          <BodyText color="lightBlack" weight={400}>
            {profile.bio || "Adicione uma bio ao seu perfil"}
          </BodyText>
        </YStack>
        <YStack space={"$2"}>
          <Title weight={400} color="lightSecondary">
            Comunidades
          </Title>
          <XCommunitiesList
            communities={userCommunities ?? []}
            onSelectCommunity={({ name }) => console.log(name)}
          />
        </YStack>
        <BodyText color="darkPrimary">
          Membro de {userCommunities?.length} comunidades
        </BodyText>
      </YStack>

      {isCurrentUser ? (
        <Button
          color="none"
          onPress={logout}
          leftIcon={
            <ArrowLeftOnRectangleIcon
              size={icons.size.medium}
              color={colors.secondary}
            />
          }
        >
          <ButtonText color={"secondary"}>Sair</ButtonText>
        </Button>
      ) : null}
    </FullScreenContainer>
  );
};
