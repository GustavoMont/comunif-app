import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";
import { Title } from "@src/components/common/Typograph/Title";
import { ConfirmCodeScreenProps } from "@src/types/navigation/freeRoutes";
import React, { useState } from "react";
import { ResetPasswordContainer } from "../ResetPassword/ResetPasswordContainer";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { Button } from "@src/components/common/Buttons/Button";
import { ButtonText } from "@src/components/common/Buttons/ButtonText";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { Link } from "@src/components/common/Typograph/Link";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { PinCell } from "@src/components/common/Form/PinCell";
import {
  ConfirmCodeBody,
  confirmCode,
  hashedEmailKey,
} from "@src/services/auth-services";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { accessKey } from "@src/utils/token";
import { useAppToast } from "@src/hooks/useAppToast";
import { YStack } from "tamagui";

export const ConfirmCode: React.FC<ConfirmCodeScreenProps> = ({
  navigation,
}) => {
  const { showToast } = useAppToast();
  const [code, setCode] = useState("");
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const onChangeText = (value: string) => {
    const isOnlyNumber = /^[0-9]+$/.test(value);
    if (isOnlyNumber) {
      setCode(value);
    }
  };
  const onSubmit = async () => {
    const hashedEmail = await getItemAsync(hashedEmailKey);
    if (hashedEmail) {
      try {
        const body: ConfirmCodeBody = {
          code,
          email: hashedEmail,
        };
        const accessResponse = await confirmCode(body);
        await setItemAsync(accessKey, JSON.stringify(accessResponse));
        navigation.navigate("ChangePassword");
      } catch (error) {
        showToast({
          type: "error",
          title: "Ocorreu um erro",
          message: "Ocorreu um erro ao validar seu código tente mais uma vez",
        });
      }
    } else {
      showToast({
        type: "error",
        title: "Ocorreu um erro",
        message: "Ocorreu um erro ao validar seu código tente mais uma vez",
      });
    }
  };

  return (
    <ResetPasswordContainer>
      <FullScreenContainer>
        <YStack jc={"center"} space={"$6"} flex={1}>
          <Title align="center" color="secondary">
            Recuperar senha
          </Title>
          <YStack space={"$6"}>
            <YStack space={"$4"}>
              <BodyText>Insira o código enviado</BodyText>
              <CodeField
                ref={ref}
                {...props}
                value={code}
                testID="code-input"
                onChangeText={onChangeText}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <PinCell
                    symbol={symbol}
                    isFocused={isFocused}
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                  />
                )}
              />
            </YStack>
            <Button
              minSize
              color="secondary"
              alignSelf="flex-end"
              rightIcon={
                <ChevronRightIcon width={24} height={24} color={"white"} />
              }
              type="rounded"
              onPress={onSubmit}
            >
              <ButtonText color="white">Confirmar</ButtonText>
            </Button>
            <Link
              screen="ForgotPassword"
              type="text"
              color="secondary"
              size={18}
              weight={600}
            >
              Voltar
            </Link>
          </YStack>
        </YStack>
      </FullScreenContainer>
    </ResetPasswordContainer>
  );
};
