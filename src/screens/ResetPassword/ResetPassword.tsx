import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Title } from "@src/components/common/Typograph/Title";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { TextInput } from "@src/components/common/Form/TextInput";
import { Link } from "@src/components/common/Typograph/Link";
import {
  ChevronRightIcon,
  EnvelopeOpenIcon,
} from "react-native-heroicons/outline";
import colors from "@src/styles/themes/colors";
import { ResetPasswordContainer } from "./ResetPasswordContainer";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import * as Storage from "expo-secure-store";
import { KeyboardCloser } from "@components/common/Layout/KeyboardCloser";
import { ResetPasswordModal } from "@components/reset-password/ResetPasswordModal";
import { Button } from "@components/common/Buttons/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppToast } from "@hooks/useAppToast";
import {
  ResetPasswordDto,
  hashedEmailKey,
  resetPassword,
} from "@src/services/auth-services";
import { FreeStackRoutes } from "@src/types/navigation/freeRoutes";

const resetPasswordValidation = yup
  .object<ResetPasswordDto>({
    email: yup
      .string()
      .email("Insira um e-mail válido")
      .required("Insira um e-mail válido"),
  })
  .required();

type Props = NativeStackScreenProps<FreeStackRoutes, "ForgotPassword">;

export const ResetPassword: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: yupResolver(resetPasswordValidation),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useAppToast();

  const onSubmit = async (data: ResetPasswordDto) => {
    try {
      setIsLoading(true);
      const hashedEmail = await resetPassword(data);
      await Storage.setItemAsync(hashedEmailKey, hashedEmail);
      setIsModalOpen(true);
    } catch (error) {
      const { response } = error as AxiosError<{ message: string }>;
      showToast({
        type: "error",
        title: "Ocorreu um erro",
        message: response?.data.message || "Não foi possível completar a ação",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const close = () => {
    setIsModalOpen(false);
    navigation.navigate("ConfirmCode");
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordModal isOpen={isModalOpen} onClose={close} />
      <KeyboardCloser>
        <View style={styles.content}>
          <Title weight={600} align="center" color="secondary">
            Recuperar Senha
          </Title>
          <BodyText>Enviaremos um código de recuperação para o e-mail</BodyText>
          <Controller
            name="email"
            control={control}
            render={({ field: { onBlur, onChange, value, name } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors[name]?.message?.toString()}
                label="E-mail:"
                placeholder="insira seu e-mail"
              />
            )}
          />
          <Button
            type="rounded"
            color="secondary"
            alignSelf="flex-end"
            minSize
            isLoading={isLoading}
            accessibilityRole="button"
            onPress={handleSubmit(onSubmit)}
            rightIcon={<ChevronRightIcon size={20} color={colors.white} />}
          >
            <BodyText size={20} color="white">
              Enviar
            </BodyText>
          </Button>
          <Link
            icon={<EnvelopeOpenIcon color={colors.secondary} />}
            type="text"
            screen="ConfirmCode"
            color="secondary"
          >
            Já possuo o código
          </Link>
        </View>
      </KeyboardCloser>
    </ResetPasswordContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 24,
    justifyContent: "center",
  },
});
