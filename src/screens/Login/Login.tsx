import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { CircleProps } from "../../types/components/BackgroundCircle";
import BackgroundCircle from "../../components/common/Layout/BackgroundCircle";
import styled from "styled-components/native";
import { Button } from "../../components/common/Buttons/Button";
import { FlexGap } from "../../components/common/Layout/FlexGap";
import { Title } from "../../components/common/Typograph/Title";
import { BodyText } from "../../components/common/Typograph/BodyText";
import { ButtonText } from "../../components/common/Buttons/ButtonText";
import { Link } from "../../components/common/Typograph/Link";
import { useAuth } from "@src/hooks/useAuth";
import { useForm } from "react-hook-form";
import { ControledInput } from "@src/components/common/Form/ControledInput";
import { LoginPayload } from "@src/models/User";
import { AxiosError } from "axios";
import { useAppToast } from "@src/hooks/useAppToast";
import { Stack } from "tamagui";
interface HandlePositionParams {
  size: number;
  showPercentage: number;
}

const handlePosition = ({ size, showPercentage }: HandlePositionParams) =>
  -size + size * showPercentage;

export const Login = () => {
  const { login } = useAuth();
  const [isLogging, setIsLogging] = useState(false);
  const { showToast } = useAppToast();
  const { control, handleSubmit } = useForm<LoginPayload>();

  const onSubmit = async (body: LoginPayload) => {
    try {
      setIsLogging(true);
      await login(body);
      Keyboard.dismiss();
    } catch (error) {
      const { response } = error as AxiosError<{ message: string }>;
      showToast({
        message: response?.data.message || "Não foi possível realizar login",
        title: "Ocorreu um erro",
        type: "error",
      });
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <BackgroundCircle useAnimation={false} circles={cicles}>
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlexGap gap={16} style={styles.screenContainer}>
            <Title color="primary" size={32}>
              Login
            </Title>
            <ControledInput
              control={control}
              name="username"
              placeholder="insira seu username ou email"
            />
            <Stack
              alignItems={"flex-end"}
              style={styles.passwordContainer}
              space={2}
            >
              <ControledInput
                control={control}
                name="password"
                secureTextEntry
                placeholder="insira sua senha"
              />
              <Link
                screen="ForgotPassword"
                type="text"
                size={14}
                color="secondary"
                align="right"
              >
                Esqueceu sua senha?
              </Link>
            </Stack>

            <Button
              isLoading={isLogging}
              testID="loginBtn"
              onPress={handleSubmit(onSubmit)}
            >
              <ButtonText size={20} color="white">
                Login
              </ButtonText>
            </Button>
            <FlexGap direction="row" gap={4}>
              <BodyText size={14} color="darkWhite">
                Ainda não possui conta?
              </BodyText>
              <Link screen="Signup" type="text" size={14} color="secondary">
                Cadastre-se
              </Link>
            </FlexGap>
          </FlexGap>
        </TouchableWithoutFeedback>
      </Container>
    </BackgroundCircle>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const cicles: CircleProps[] = [
  {
    color: "lightSecondary",
    position: {
      left: handlePosition({
        size: width * 0.41,
        showPercentage: 0.42,
      }),
      top: width * 0.11,
    },
    size: Math.round(width) * 0.41,
  },
  {
    color: "primary",
    position: {
      left: handlePosition({
        size: width * 0.84,
        showPercentage: 0.51,
      }),
      top: handlePosition({
        size: width * 0.84,
        showPercentage: 0.43,
      }),
    },
    size: Math.round(width) * 0.84,
  },
  {
    color: "lightSecondary",
    position: {
      bottom: height * 0.1,
      right: handlePosition({
        showPercentage: 0.4,
        size: width * 0.41,
      }),
    },
    size: Math.round(width) * 0.41,
  },
  {
    color: "primary",
    position: {
      right: handlePosition({
        size: width * 0.84,
        showPercentage: 0.51,
      }),
      bottom: handlePosition({
        size: width * 0.84,
        showPercentage: 0.43,
      }),
    },
    size: width * 0.84,
  },
];

const styles = StyleSheet.create({
  passwordContainer: { width: "100%" },
  screenContainer: { alignItems: "center", width: "100%" },
});
