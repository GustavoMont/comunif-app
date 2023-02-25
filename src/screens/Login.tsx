import { Text, Dimensions, View } from "react-native";
import React from "react";
import { FullScreenContainer } from "../components/common/FullScreenContainer";
import { CircleProps } from "../types/components/BackgroundCircle";
import BackgroundCircle from "../components/common/BackgroundCircle";
import styled from "styled-components/native";
import { H2 } from "../components/common/Typograph/H2";
import { TextInput } from "../components/common/Form/InputText";
import { PasswordInput } from "../components/common/Form/PasswordInput";
import { Button } from "../components/common/Buttons/Button";

interface HandlePositionParams {
  size: number;
  showPercentage: number;
}

const handlePosition = ({ size, showPercentage }: HandlePositionParams) =>
  -size + size * showPercentage;

const Login = () => {
  return (
    <FullScreenContainer>
      <BackgroundCircle circles={cicles}>
        <Container>
          <H2>Login</H2>
          <TextInput placeholder="insira seu username ou email" />
          <PasswordInput placeholder="insira sua senha" />
          <Button>
            <Text>Login</Text>
          </Button>
          <View>
            <Text>Esqueceu sua senha?</Text>
            <Text>Ainda não possui conta?</Text>
          </View>
        </Container>
      </BackgroundCircle>
    </FullScreenContainer>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
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

export default Login;
