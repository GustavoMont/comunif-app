import React from "react";
import { Title } from "../common/Typograph/Title";
import { BodyText } from "../common/Typograph/BodyText";
import { Button } from "../common/Buttons/Button";
import { ButtonText } from "../common/Buttons/ButtonText";
import { Modal } from "@components/common/Panels/Modal";
import { YStack } from "tamagui";

interface Props {
  isVisible: boolean;
  onClose(): void;
}

export const PasswordChangedModal: React.FC<Props> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <YStack space={"$4"}>
        <Title align="center" color="secondary">
          Senha alterada!
        </Title>
        <BodyText>
          Você já pode usar sua nova senha para acessar o aplicativo!
        </BodyText>
        <Button onPress={onClose} alignSelf="center" minSize>
          <ButtonText color="white">Ok</ButtonText>
        </Button>
      </YStack>
    </Modal>
  );
};
