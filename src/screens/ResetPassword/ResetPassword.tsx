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
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Storage from "expo-secure-store";
import { KeyboardCloser } from "@src/components/common/Layout/KeyboardCloser";
import { ResetPasswordModal } from "@src/components/reset-password/ResetPasswordModal";
import { Button } from "@src/components/common/Buttons/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FreeStackRoutes } from "@src/types/navigation/freeRoutes";
import {
  ResetPasswordDto,
  hashedEmailKey,
  resetPassword,
} from "@src/services/authServices";

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

  const onSubmit = async (data: ResetPasswordDto) => {
    try {
      setIsLoading(true);
      const hashedEmail = await resetPassword(data);
      await Storage.setItemAsync(hashedEmailKey, hashedEmail);
      setIsModalOpen(true);
    } catch (error) {
      const { response } = error as AxiosError<{ message: string }>;

      Toast.show({
        type: "error",
        text1: "Ocorreu um erro",
        text2: response?.data.message,
        topOffset: 50,
        visibilityTime: 10 * 1000,
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
      <FullScreenContainer>
        <KeyboardCloser>
          <View style={styles.container}>
            <Title weight={600} align="center" color="secondary">
              Recuperar Senha
            </Title>
            <BodyText>
              Enviaremos um código de recuperação para o e-mail
            </BodyText>
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
      </FullScreenContainer>
    </ResetPasswordContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    justifyContent: "center",
  },
});
