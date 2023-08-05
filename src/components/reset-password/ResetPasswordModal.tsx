import React from "react";
import { Title } from "../common/Typograph/Title";
import { Dialog, Unspaced, View, YStack } from "tamagui";
import { useTheme } from "styled-components/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { Button } from "@components/common/Buttons/Button";
import { BodyText } from "../common/Typograph/BodyText";
import { ButtonText } from "@components/common/Buttons/ButtonText";
import { StyleSheet } from "react-native";

interface Props {
  onClose(): void;
  isOpen: boolean;
}

export const ResetPasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { backgroundScreen, colors } = useTheme();

  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      open={isOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={styles.opacityStyle}
          exitStyle={styles.opacityStyle}
        />
        <Dialog.Content
          elevate
          key="content"
          backgroundColor={backgroundScreen}
          animateOnly={["transform", "opacity"]}
          w={"90%"}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={styles.contentEnterStyle}
          exitStyle={styles.contentExitStyle}
          space
        >
          <Unspaced>
            <Dialog.Close asChild>
              <View top={"$3"} right={"$3"} position="absolute" asChild>
                <ButtonText>
                  <XMarkIcon width={24} height={24} color={colors.lightBlack} />
                </ButtonText>
              </View>
            </Dialog.Close>
          </Unspaced>
          <YStack space={"$3"}>
            <Title color="secondary" align="center">
              E-mail enviado!
            </Title>
            <BodyText>
              Foi enviado um código de segurança para seu e-mail. Cheque agora
              seu e-mail
            </BodyText>
            <Button onPress={onClose} minSize alignSelf="center">
              <ButtonText>Ok</ButtonText>
            </Button>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  contentEnterStyle: { opacity: 0, scale: 0.9, x: 0, y: -20 },
  contentExitStyle: { opacity: 0, scale: 0.95, x: 0, y: 10 },
  opacityStyle: {
    opacity: 0,
  },
});
