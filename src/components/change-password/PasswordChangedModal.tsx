import { Modal, Stack } from "native-base";
import React from "react";
import { Title } from "../common/Typograph/Title";
import { BodyText } from "../common/Typograph/BodyText";
import { Button } from "../common/Buttons/Button";
import { ButtonText } from "../common/Buttons/ButtonText";

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
      <Modal.Content w={"full"}>
        <Modal.CloseButton onPress={onClose} testID="close-modal-button" />
        <Modal.Body py={"5"} px={"8"}>
          <Stack space={"4"}>
            <Title align="center" color="secondary">
              Senha alterada!
            </Title>
            <BodyText>
              Você já pode usar sua nova senha para acessar o aplicativo!
            </BodyText>
            <Button onPress={onClose} alignSelf="center" minSize>
              <ButtonText color="white">Ok</ButtonText>
            </Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
