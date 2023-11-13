import React from "react";
import { Modal } from "../common/Panels/Modal";
import { Title } from "../common/Typograph/Title";
import { XStack, YStack } from "tamagui";
import { Button } from "../common/Buttons/Button";
import { ButtonText } from "../common/Buttons/ButtonText";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../common/Form/TextInput";
import {
  CreateEvasionReport,
  createEvasionReport,
} from "@src/services/evasion-reports-services";
import { Community } from "@src/models/Community";
import { useAuth } from "@src/hooks/useAuth";
import { Keyboard, StyleSheet } from "react-native";
import { BodyText } from "../common/Typograph/BodyText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveCommunity } from "@src/services/communities-services";
import { useAppToast } from "@src/hooks/useAppToast";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@src/types/navigation/protectedRoutes";

interface Props {
  isOpen: boolean;
  close(): void;
  community: Community;
}

export const LeaveCommunityModal: React.FC<Props> = ({
  close,
  isOpen,
  community,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigation>();
  const { showToast } = useAppToast();
  const { control, handleSubmit } = useForm<CreateEvasionReport>({
    defaultValues: {
      communityId: community.id,
      reason: null,
      userId: user?.id ?? 0,
    },
  });
  const onLeave = async (data: CreateEvasionReport) => {
    await createEvasionReport(data);
    await leaveCommunity(community.id, user?.id ?? 0);
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(onLeave, {
    async onSuccess() {
      showToast({
        message: "Esperamos encontrar você depois",
        title: "Você saiu da comunidade",
        type: "warning",
      });
      await queryClient.invalidateQueries(["user-communities", user?.id]);
      navigation.navigate("Home");
    },
    onError(err) {
      console.error(err);

      showToast({
        message: "Ocorrreu um erro ao sair da comunidade",
        title: "Não foi possível completar a ação",
        type: "error",
      });
    },
  });
  const onSubmit = (data: CreateEvasionReport) => {
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack space={"$4"}>
          <Title align="center" color="secondary">
            Deseja sair da comunidade?
          </Title>
          <YStack space={"$2"}>
            <Controller
              name="reason"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Motivo"
                  variant="filled"
                  onChangeText={onChange}
                  value={value ?? ""}
                  multiline
                />
              )}
            />
            <BodyText color="lightSecondary" size={12}>
              Você não poderá mais ver as mensagens dessa comunidade
            </BodyText>
          </YStack>
          <XStack space={"$4"}>
            <Button onPress={close} style={styles.button} color="darkWhite">
              <ButtonText color="lightBlack">Cancelar</ButtonText>
            </Button>
            <Button
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
              isLoading={isLoading}
              color="secondary"
            >
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </XStack>
        </YStack>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    flexShrink: 1,
  },
});
