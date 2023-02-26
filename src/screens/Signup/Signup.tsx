import { Dimensions } from "react-native";
import React from "react";
import { FullScreenContainer } from "../../components/common/Layout/FullScreenContainer";
import BackgroundCircle from "../../components/common/Layout/BackgroundCircle";
import { FlexGap } from "../../components/common/Layout/FlexGap";
import { Title } from "../../components/common/Typograph/Title";
import styled from "styled-components/native";
import { CircleProps } from "../../types/components/BackgroundCircle";
import { PasswordStep } from "./Steps/PasswordStep";
import { ComunitiesStep } from "./Steps/ComunitiesStep";

interface HandlePositionParams {
  size: number;
  showPercentage: number;
}

const handlePosition = ({ size, showPercentage }: HandlePositionParams) =>
  -size + size * showPercentage;

const Signup: React.FC = () => {
  return (
    <FullScreenContainer>
      <BackgroundCircle circles={cicles}>
        <Container>
          <FlexGap gap={16} style={{ width: "100%", alignItems: "center" }}>
            <Title color="primary" size={32}>
              Cadastro
            </Title>
            <FlexGap gap={16} style={{ width: "100%" }}>
              <ComunitiesStep />
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

export default Signup;
