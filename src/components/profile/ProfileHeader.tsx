import React from "react";
import { View, YStack } from "tamagui";
import { AvatarProfile } from "./AvatarProfile";
import { User } from "@src/models/User";
import { BodyText } from "../common/Typograph/BodyText";
import { useAuth } from "@src/hooks/useAuth";
import { IconButton } from "../common/Buttons/IconButton";
import { PencilIcon } from "react-native-heroicons/outline";
interface Props {
  user?: User;
  onPressEdit(): void;
}

export const ProfileHeader: React.FC<Props> = ({ user, onPressEdit }) => {
  const { user: currentUser } = useAuth();
  const isAllowedToEdit = currentUser?.id === user?.id;

  return (
    <YStack ai={"center"} space={"$2"}>
      <View position="relative">
        <AvatarProfile avatar={user?.avatar} />
        {isAllowedToEdit ? (
          <View position="absolute" right={"$3"} bottom={"$0"}>
            <IconButton
              accessibilityLabel="Editar perfil"
              icon={PencilIcon}
              iconColor="white"
              iconSize={24}
              color="secondary"
              rounded
              onPress={onPressEdit}
            />
          </View>
        ) : null}
      </View>
      <YStack>
        <BodyText color="lightBlack" weight={600} size={20}>
          {user?.name} {user?.lastName}
        </BodyText>
        <BodyText color="primary">@{user?.username}</BodyText>
      </YStack>
    </YStack>
  );
};
