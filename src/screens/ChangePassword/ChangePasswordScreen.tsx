import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { KeyboardCloser } from "@src/components/common/Layout/KeyboardCloser";
import { Title } from "@src/components/common/Typograph/Title";
import { ChangePasswordScreenProps } from "@src/types/navigation/freeRoutes";
import { Center, Stack } from "native-base";
import React, { useState } from "react";
import { ResetPasswordContainer } from "../ResetPassword/ResetPasswordContainer";
import { ControledInput } from "@src/components/common/Form/ControledInput";
import { useForm } from "react-hook-form";
import { Button } from "@src/components/common/Buttons/Button";
import { ButtonText } from "@src/components/common/Buttons/ButtonText";
import { CheckIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { passwordValidation } from "@src/data/validations/password-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePassword, changePassword } from "@src/services/auth-services";
import { useAppToast } from "@src/hooks/useAppToast";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { PasswordChangedModal } from "@src/components/change-password/PasswordChangedModal";

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  navigation,
}) => {
  const { showToast } = useAppToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit } = useForm<ChangePassword>({
    resolver: yupResolver(passwordValidation),
  });
  const { mutate, isLoading } = useMutation(changePassword, {
    onSuccess() {
      setIsModalOpen(true);
    },
    onError(error) {
      const { response } = error as AxiosError<{ message: string }>;
      showToast({
        message: response?.data.message ?? "Não foi possível alterar a senha",
        title: "Ocorreu um erro",
        type: "error",
      });
    },
  });
  const onCloseModal = () => {
    setIsModalOpen(false);
    navigation.navigate("Login");
  };

  const onSubmit = async (data: ChangePassword) => {
    await mutate(data);
  };

  const { icons, colors } = useTheme();
  return (
    <ResetPasswordContainer>
      <PasswordChangedModal isVisible={isModalOpen} onClose={onCloseModal} />
      <FullScreenContainer>
        <KeyboardCloser>
          <Center flex={1}>
            <Title weight={600} size={24} color="secondary">
              Mudar a senha
            </Title>
            <Stack w={"full"} space={"6"}>
              <ControledInput
                secureTextEntry
                label="Nova senha:"
                placeholder="insira a nova senha"
                control={control}
                name="password"
              />
              <ControledInput
                secureTextEntry
                label="Confirmar senha:"
                placeholder="confirmar senha"
                control={control}
                name="confirmPassword"
              />
              <Button
                type="rounded"
                minSize
                isLoading={isLoading}
                alignSelf="flex-end"
                onPress={handleSubmit(onSubmit)}
                rightIcon={
                  <CheckIcon
                    width={icons.size.medium}
                    height={icons.size.medium}
                    color={colors.white}
                  />
                }
              >
                <ButtonText size={20} color="white">
                  Alterar senha
                </ButtonText>
              </Button>
            </Stack>
          </Center>
        </KeyboardCloser>
      </FullScreenContainer>
    </ResetPasswordContainer>
  );
};
