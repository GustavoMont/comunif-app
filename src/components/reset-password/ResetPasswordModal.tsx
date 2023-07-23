import { Modal, Stack } from "native-base";
import React from "react";
import { Title } from "../common/Typograph/Title";
import { BodyText } from "../common/Typograph/BodyText";

interface Props {
  onClose(): void;
  isOpen: boolean;
}

export const ResetPasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} avoidKeyboard onClose={onClose}>
      <Modal.Content w={"full"}>
        <Modal.CloseButton testID="modal-close-button" onPress={onClose} />
        <Modal.Body px={"8"} py={"8"}>
          <Stack space={2.5}>
            <Title color="secondary" align="center">
              E-mail enviado!
            </Title>
            <BodyText>
              Foi enviado um código de segurança para seu e-mail. Cheque agora
              seu e-mail
            </BodyText>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
