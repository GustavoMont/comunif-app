import React from "react";
import { Title } from "../common/Typograph/Title";
import { YStack } from "tamagui";
import { Button } from "@components/common/Buttons/Button";
import { BodyText } from "../common/Typograph/BodyText";
import { ButtonText } from "@components/common/Buttons/ButtonText";

import { Modal } from "@components/common/Panels/Modal";

interface Props {
  onClose(): void;
  isOpen: boolean;
}

export const ResetPasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <YStack space={"$3"}>
        <Title color="secondary" align="center">
          E-mail enviado!
        </Title>
        <BodyText>
          Foi enviado um código de segurança para seu e-mail. Cheque agora seu
          e-mail
        </BodyText>
        <Button onPress={onClose} minSize alignSelf="center">
          <ButtonText>Ok</ButtonText>
        </Button>
      </YStack>
    </Modal>
  );
};
