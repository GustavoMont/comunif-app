import { StyleSheet, View } from "react-native";
import React from "react";
import { Title } from "@src/components/common/Typograph/Title";
import { BodyText } from "@src/components/common/Typograph/BodyText";
import { TextInput } from "@src/components/common/Form/TextInput";
import { Button } from "@src/components/common/Buttons/Button";
import { Link } from "@src/components/common/Typograph/Link";
import {
  ChevronRightIcon,
  EnvelopeOpenIcon,
} from "react-native-heroicons/outline";
import colors from "@src/styles/themes/colors";
import { ResetPasswordContainer } from "./ResetPasswordContainer";
import { FullScreenContainer } from "@src/components/common/Layout/FullScreenContainer";

export const ResetPassword = () => {
  return (
    <ResetPasswordContainer>
      <FullScreenContainer>
        <View style={styles.container}>
          <Title weight={600} align="center" color="secondary">
            Recuperar Senha
          </Title>
          <BodyText>Enviaremos um código de recuperação para o e-mail</BodyText>
          <TextInput label="E-mail:" placeholder="insira seu e-mail" />
          <Button
            type="rounded"
            color="secondary"
            alignSelf="flex-end"
            minSize
            accessibilityRole="button"
            rightIcon={<ChevronRightIcon size={20} color={colors.white} />}
          >
            <BodyText color="white">Enviar</BodyText>
          </Button>
          <Link
            icon={<EnvelopeOpenIcon color={colors.secondary} />}
            type="text"
            screen="reset-password/step2"
            color="secondary"
          >
            Já posssuo o código
          </Link>
        </View>
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
