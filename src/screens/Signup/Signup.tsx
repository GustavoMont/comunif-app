import { Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FullScreenContainer } from "../../components/common/Layout/FullScreenContainer";
import BackgroundCircle from "../../components/common/Layout/BackgroundCircle";
import { FlexGap } from "../../components/common/Layout/FlexGap";
import { Title } from "../../components/common/Typograph/Title";
import styled from "styled-components/native";
import { CircleProps, Position } from "../../types/components/BackgroundCircle";
import { PasswordStep } from "./Steps/PasswordStep";
import { ComunitiesStep } from "./Steps/ComunitiesStep";
import { BodyText } from "@components/common/Typograph/BodyText";
import { Steps } from "@components/common/Form/Steps";
import { NameStep } from "./Steps/NameStep";
import { UserInfoStep } from "./Steps/UserInfoStep";
import { Button } from "@components/common/Buttons/Button";

interface HandlePositionParams {
  size: number;
  showPercentage: number;
}

const handlePosition = ({ size, showPercentage }: HandlePositionParams) =>
  -size + size * showPercentage;

const Signup: React.FC = () => {
  const [positionIndex, setPositionIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = [
    <NameStep />,
    <UserInfoStep />,
    <PasswordStep />,
    <ComunitiesStep />,
  ];
  return (
    <FullScreenContainer>
      <BackgroundCircle circles={cicles} positions={positions[positionIndex]}>
        <Container>
          <FlexGap gap={16} style={{ width: "100%", alignItems: "center" }}>
            <Title color="primary" size={32}>
              Cadastro
            </Title>
            <FlexGap gap={16} style={{ width: "100%" }}>
              {steps[activeStep]}
              <Button minSize style={{ alignSelf: "flex-end" }}>
                <BodyText color="white">Avançar</BodyText>
                <BodyText color="white">Avançar</BodyText>
              </Button>
            </FlexGap>
            <Steps
              size={(width * 0.5) / 4}
              steps={[
                { status: "progress" },
                { status: "todo" },
                { status: "todo" },
                { status: "todo" },
              ]}
            />
          </FlexGap>
        </Container>
      </BackgroundCircle>
    </FullScreenContainer>
  );
};

const width = Dimensions.get("window").width;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const size = width * 0.32;

const positions1 = [
  {
    left: -32,
    top: 73,
  },
  {
    left: -24,
    bottom: -24,
  },
  {
    left: -74,
    bottom: 56,
  },
  {
    top: 133,
    right: -50,
  },
  {
    top: 33,
    right: -74,
  },
  {
    top: -47,
    right: -24,
  },
];
const positions2 = [
  {
    left: -25,
    bottom: -35,
  },
  {
    right: -14,
    bottom: -74,
  },
  {
    right: -56,
    bottom: 6,
  },
  {
    top: -27,
    right: -50,
  },
  {
    top: -67,
    left: 54,
  },
  {
    top: -47,
    left: -36,
  },
];
const position3 = [
  {
    right: -25,
    bottom: -50,
  },
  {
    right: -56,
    top: 112,
  },
  {
    right: -56,
    top: 22,
  },
  {
    top: -27,
    left: -20,
  },
  {
    bottom: 35,
    left: -76,
  },
  {
    bottom: -36,
    left: -35,
  },
];
const positions: Position[][] = [positions1, positions2, position3, positions1];

const cicles: CircleProps[] = [
  {
    color: "secondary",
    position: {},
    size,
  },
  {
    color: "primary",
    position: {},
    size,
  },
  {
    color: "primary",
    position: {},
    size,
  },
  {
    color: "secondary",
    position: {},
    size,
  },
  {
    color: "primary",
    position: {},
    size,
  },
  {
    color: "primary",
    position: {},
    size,
  },
];

export default Signup;
