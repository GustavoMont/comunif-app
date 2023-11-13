import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import { Dialog, Unspaced, View } from "tamagui";
import { ButtonText } from "@components/common/Buttons/ButtonText";
import { XMarkIcon } from "react-native-heroicons/outline";

export interface ModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
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
            <Dialog.Close testID="close-modal-button" asChild>
              <View top={"$3"} right={"$3"} position="absolute" asChild>
                <ButtonText>
                  <XMarkIcon width={24} height={24} color={colors.lightBlack} />
                </ButtonText>
              </View>
            </Dialog.Close>
          </Unspaced>
          {children}
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
