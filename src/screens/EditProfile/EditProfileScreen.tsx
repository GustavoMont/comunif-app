import { Button } from "@src/components/common/Buttons/Button";
import { ButtonText } from "@src/components/common/Buttons/ButtonText";
import { IconButton } from "@src/components/common/Buttons/IconButton";
import { Avatar } from "@src/components/common/Content/Avatar";
import { TextInput } from "@src/components/common/Form/TextInput";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { KeyboardCloser } from "@src/components/common/Layout/KeyboardCloser";
import { Title } from "@src/components/common/Typograph/Title";
import { useAppToast } from "@src/hooks/useAppToast";
import { useAuth } from "@src/hooks/useAuth";
import {
  UpdateUser,
  updateAvatar,
  updateUser,
} from "@src/services/users-services";
import { ImageFile } from "@src/types/RN";
import { EditProfileScreenProps } from "@src/types/navigation/protectedRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import {
  CameraIcon,
  CheckIcon,
  ChevronLeftIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { Separator, View, XStack, YStack } from "tamagui";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { usePermissions } from "@src/hooks/usePermissions";

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const { showToast } = useAppToast();
  const { icons, colors } = useTheme();
  const { user, updateUser: updateCurrentUser } = useAuth();
  const [hasChanges, setHasChanges] = useState(false);
  const { hasGalleryCameraPermission } = usePermissions();
  type Avatar = string | ImageFile | null;
  const [image, setImage] = useState<Avatar>(user?.avatar ?? null);
  const { control, handleSubmit, watch } = useForm<UpdateUser>({
    defaultValues: {
      bio: user?.bio,
      lastName: user?.lastName,
      name: user?.name,
      username: user?.username,
    },
  });

  const handleImageUpload = async () => {
    const hasPermission = await hasGalleryCameraPermission();
    if (!hasPermission) {
      return;
    }

    const { assets } = await launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: false,
      mediaTypes: MediaTypeOptions.Images,
    });
    if (!assets?.[0]) {
      return;
    }
    const [file] = assets;
    const avatar: Avatar = {
      name: file.fileName ?? "profile",
      type: file.type ? `${file.type}/png` : "image/png",
      uri: file.uri,
    };
    setHasChanges(true);
    setImage(avatar);
  };

  const queryClient = useQueryClient();
  const handleUserUpdate = async (data: UpdateUser) => {
    if (!user) {
      throw new Error("User not provided");
    }
    if (image && typeof image !== "string") {
      await updateAvatar(user.id, image);
    }
    const updatedUser = await updateUser(user?.id ?? 0, data);
    return updatedUser;
  };
  const { mutate: updateUserInfo, isLoading } = useMutation(handleUserUpdate, {
    onSuccess(updatedUser) {
      updateCurrentUser(updatedUser);
      setHasChanges(false);
      showToast({
        message: "Seu perfil foi atualizado com sucesso",
        title: "Perfil atualizado",
        type: "success",
      });
      return queryClient.invalidateQueries(["user", updatedUser.id]);
    },
    onError(error: AxiosError<{ message: string }>) {
      showToast({
        message: error.response?.data.message ?? "Verifique todas informações",
        title: "Ocorreu um erro",
        type: "error",
      });
    },
  });
  const onSubmit = (data: UpdateUser) => {
    updateUserInfo(data);
  };

  const handleImageSource = (image: Avatar): string => {
    if (image) {
      return typeof image === "string" ? image : image.uri;
    }
    return "";
  };

  useEffect(() => {
    const subscription = watch(() => setHasChanges(true));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <FullScreenContainer>
      <ScrollView>
        <KeyboardCloser>
          <View>
            <XStack w={"100%"} ai={"center"} jc={"space-between"}>
              <Button
                onPress={() =>
                  navigation.navigate("Profile", { userId: user?.id ?? 0 })
                }
                minSize
                color="none"
                leftIcon={
                  <ChevronLeftIcon
                    size={icons.size.medium}
                    color={colors.darkWhite}
                  />
                }
              >
                <ButtonText color="darkWhite">Cancelar</ButtonText>
              </Button>
              <Title style={styles.title} color="secondary">
                Editar Perfil
              </Title>
              <Button
                onPress={handleSubmit(onSubmit)}
                minSize
                disabled={!hasChanges}
                isLoading={isLoading}
                color="none"
                rightIcon={
                  <CheckIcon
                    size={icons.size.medium}
                    color={hasChanges ? colors.primary : colors.darkWhite}
                  />
                }
              >
                <ButtonText color={hasChanges ? "primary" : "darkWhite"}>
                  Salvar
                </ButtonText>
              </Button>
            </XStack>
            <YStack space="$6" mt={"$6"}>
              <XStack space={"$1.5"}>
                <View style={styles.editAvatarButton}>
                  <Avatar
                    fallback={{
                      backgroundColor: "primary",
                      icon: UserIcon,
                    }}
                    size="lg"
                    src={handleImageSource(image)}
                  />
                  <IconButton
                    style={styles.editAvatarButton}
                    accessibilityLabel="Editar avatar"
                    icon={CameraIcon}
                    iconColor="white"
                    iconSize={24}
                    color="secondary"
                    onPress={handleImageUpload}
                    rounded
                  />
                </View>
                <YStack flex={1} space={"$2"}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        variant="flushed"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        variant="flushed"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </YStack>
              </XStack>
              <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    variant="flushed"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Separator borderColor={colors.primary} />
              <YStack>
                <Title color="lightSecondary">Bio</Title>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      variant="filled"
                      onChangeText={onChange}
                      value={value}
                      multiline
                    />
                  )}
                />
              </YStack>
            </YStack>
          </View>
        </KeyboardCloser>
      </ScrollView>
    </FullScreenContainer>
  );
};

const styles = StyleSheet.create({
  editAvatarButton: { bottom: 0, position: "absolute" },
  title: { marginLeft: -8 },
});
