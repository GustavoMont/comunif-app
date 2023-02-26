import React from "react";
import { PasswordInput } from "@components/common/Form/PasswordInput";
import { FlexGap } from "@components/common/Layout/FlexGap";

export const PasswordStep = () => {
  return (
    <FlexGap gap={16}>
      <PasswordInput label="Senha:" placeholder="Digite uma senha forte" />
      <PasswordInput
        label="Confirmar senha:"
        placeholder="Digite uma senha forte"
      />
    </FlexGap>
  );
};
