import {
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { FullScreenContainer } from "../../components/common/Layout/FullScreenContainer";
import BackgroundCircle from "../../components/common/Layout/BackgroundCircle";
import { Title } from "../../components/common/Typograph/Title";
import { useTheme } from "styled-components/native";
import { CircleProps, Position } from "../../types/components/BackgroundCircle";
import { PasswordStep } from "./Steps/PasswordStep";
import { BodyText } from "@components/common/Typograph/BodyText";
import { Steps } from "@components/common/Form/Steps";
import { NameStep } from "./Steps/NameStep";
import { UserInfoStep } from "./Steps/UserInfoStep";
import { Button } from "@components/common/Buttons/Button";
import {
  ChevronRightIcon,
  CheckIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import { StyleSheet } from "react-native";
import { AxiosError } from "axios";
import { RegisterPayload } from "@src/models/User";
import { useAuth } from "@hooks/useAuth";
import { useAppToast } from "@src/hooks/useAppToast";
import { passwordValidation } from "@src/data/validations/password-validation";
import { YStack } from "tamagui";

const nameSchema = yup
  .object({
    name: yup
      .string()
      .required("Nome é um campo obrigatório")
      .min(3, "Nome tem que ter nom mínimo 3 letras"),
    lastName: yup
      .string()
      .required("Sobrenome é um campo obrigatório")
      .min(3, "Sobrenome tem que ter nom mínimo 3 letras"),
  })
  .required();

const userInfoSchema = yup
  .object({
    birthday: yup.date().test("Min age", "No mínimo 15 anos", (value) => {
      const minDate = moment().subtract(15, "year");
      return moment(value).isBefore(minDate);
    }),
    email: yup
      .string()
      .email("Insira um e-mail válido")
      .required("E-mail é um campo obrigatório")
      .min(3, "Nome tem que ter no mínimo 3 caracteres"),
    username: yup
      .string()
      .required("Nome de usuário é obrigatório")
      .matches(/^[a-zA-Z0-9_]+$/, "Nome de usuário inválido")
      .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
      .max(30, "Nome de usuário deve ter no máximo 30 caracteres"),
  })
  .required();

const schemas = [nameSchema, userInfoSchema, passwordValidation];

const Signup: React.FC = () => {
  const { icons } = useTheme();
  const { signUp } = useAuth();
  const { showToast } = useAppToast();

  const [activeStep, setActiveStep] = useState<number>(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(schemas[activeStep]),
  });
  const steps = [
    <NameStep key={1} error={errors} control={control} />,
    <UserInfoStep key={2} error={errors} control={control} />,
    <PasswordStep key={3} control={control} error={errors} />,
  ];

  const onSubmit = async (body: RegisterPayload) => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    if (isLast) {
      try {
        await signUp(body);
      } catch (err: any) {
        const { response } = err as AxiosError<{ message: string }>;
        showToast({
          type: "error",
          title: "Ocorreu um erro",
          message: response?.data.message || "Ocorreu um erro ao criar a conta",
        });
      }
    }
  };

  const isLast = steps.length <= activeStep + 1;
  const isFirst = activeStep === 0;
  return (
    <BackgroundCircle circles={cicles} positions={positions[activeStep]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack f={1} space={"$6"} ai={"center"} jc={"center"}>
          <Title color="primary" size={32}>
            Cadastro
          </Title>
          <YStack w={"100%"} gap={16}>
            <StepHandler steps={steps} activeStep={activeStep} />
            <View style={styles.buttonContainer}>
              <Button
                disabled={isFirst}
                color={isFirst ? "darkWhite" : "lightBlack"}
                onPress={() =>
                  setActiveStep((prev) => (prev !== 0 ? prev - 1 : prev))
                }
                minSize
                leftIcon={
                  <ChevronLeftIcon
                    size={icons.size.medium}
                    color={icons.color.button}
                  />
                }
              >
                <BodyText color="white">Voltar</BodyText>
              </Button>
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
              >
                <BodyText color="white">
                  {isLast ? "Finalizar" : "Avançar"}
                </BodyText>
              </Button>
            </View>
          </YStack>
          <Steps
            size={(width * 0.5) / 4}
            currentStep={activeStep}
            stepsQuantity={steps.length}
          />
        </YStack>
      </TouchableWithoutFeedback>
    </BackgroundCircle>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface StepHanlderProps {
  steps: JSX.Element[];
  activeStep: number;
}
const StepHandler: React.FC<StepHanlderProps> = ({ activeStep, steps }) => {
  return steps[activeStep];
};

const width = Dimensions.get("window").width;

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
