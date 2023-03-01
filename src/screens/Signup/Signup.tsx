import { Dimensions } from "react-native";
import React, { useState } from "react";
import { FullScreenContainer } from "../../components/common/Layout/FullScreenContainer";
import BackgroundCircle from "../../components/common/Layout/BackgroundCircle";
import { FlexGap } from "../../components/common/Layout/FlexGap";
import { Title } from "../../components/common/Typograph/Title";
import styled, { useTheme } from "styled-components/native";
import { CircleProps, Position } from "../../types/components/BackgroundCircle";
import { PasswordStep } from "./Steps/PasswordStep";
import { ComunitiesStep } from "./Steps/ComunitiesStep";
import { BodyText } from "@components/common/Typograph/BodyText";
import { Steps } from "@components/common/Form/Steps";
import { NameStep } from "./Steps/NameStep";
import { UserInfoStep } from "./Steps/UserInfoStep";
import { Button } from "@components/common/Buttons/Button";
import { ChevronRightIcon, CheckIcon } from "react-native-heroicons/outline";
import { useForm } from "react-hook-form";
interface HandlePositionParams {
  size: number;
  showPercentage: number;
}

export interface RegisterPayload {
  name: string;
  lastName: string;
  email: string;
  birthday: Date;
  password: string;
  confirmPassword: string;
}
const Signup: React.FC = () => {
  const { control, handleSubmit } = useForm<RegisterPayload>();
  const { icons } = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = [
    <NameStep control={control} />,
    <UserInfoStep />,
    <PasswordStep />,
    <ComunitiesStep />,
  ];
  const onSubmit = (data: RegisterPayload) => console.log(data);
  const isLast = steps.length <= activeStep + 1;
  return (
    <FullScreenContainer>
      <BackgroundCircle circles={cicles} positions={positions[activeStep]}>
        <Container>
          <FlexGap gap={16} style={{ width: "100%", alignItems: "center" }}>
            <Title color="primary" size={32}>
              Cadastro
            </Title>
            <FlexGap gap={16} style={{ width: "100%" }}>
              <StepHandler steps={steps} activeStep={activeStep} />
              <Button
                onPress={handleSubmit(onSubmit)}
                minSize
                rightIcon={
                  isLast ? (
                    <CheckIcon
                      size={icons.size.medium}
                      color={icons.color.button}
                    />
                  ) : (
                    <ChevronRightIcon
                      size={icons.size.medium}
                      color={icons.color.button}
                    />
                  )
                }
                style={{ alignSelf: "flex-end" }}
              >
                <BodyText color="white">
                  {isLast ? "Finalizar" : "Avançar"}
                </BodyText>
              </Button>
            </FlexGap>
            <Steps
              size={(width * 0.5) / 4}
              currentStep={activeStep}
              stepsQuantity={steps.length}
            />
          </FlexGap>
        </Container>
      </BackgroundCircle>
    </FullScreenContainer>
  );
};

interface StepHanlderProps {
  steps: JSX.Element[];
  activeStep: number;
}
const StepHandler: React.FC<StepHanlderProps> = ({ activeStep, steps }) => {
  return steps[activeStep];
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
