import React from "react";
import { Dimensions } from "react-native";
import { CircleProps } from "../types/components/BackgroundCircle";
import BackgroundCircle from "../components/common/Layout/BackgroundCircle";
import styled from "styled-components/native";
import { TextInput } from "../components/common/Form/InputText";
import { PasswordInput } from "../components/common/Form/PasswordInput";
import { Button } from "../components/common/Buttons/Button";
import { FullScreenContainer } from "../components/common/Layout/FullScreenContainer";
import { FlexGap } from "../components/common/Layout/FlexGap";
import { Title } from "../components/common/Typograph/Title";
import { BodyText } from "../components/common/Typograph/BodyText";
import { ButtonText } from "../components/common/Buttons/ButtonText";
import { Link } from "../components/common/Typograph/Link";

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
          <FlexGap gap={16} style={{ width: "100%", alignItems: "center" }}>
            <Title color="primary" size={32}>
              Login
            </Title>
            <TextInput placeholder="insira seu username ou email" />
            <FlexGap style={{ width: "100%" }} gap={8}>
              <PasswordInput placeholder="insira sua senha" />
              <Link type="text" size={14} color="secondary" align="right">
                Esqueceu sua senha?
              </Link>
            </FlexGap>
            <Button>
              <ButtonText size={20} color="white">
                Login
              </ButtonText>
            </Button>
            <FlexGap direction="row" gap={4}>
              <BodyText size={14} color="darkWhite">
                Ainda não possui conta?
              </BodyText>
              <Link type="text" size={14} color="secondary">
                Cadastre-se
              </Link>
            </FlexGap>
          </FlexGap>
        </Container>
      </BackgroundCircle>
    </FullScreenContainer>
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

export default Login;
