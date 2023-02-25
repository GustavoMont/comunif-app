import {} from "react-native";
import React from "react";
import { TextInput } from "../../../components/common/Form/InputText";
import { FlexGap } from "../../../components/common/Layout/FlexGap";

export const UserInfoStep = () => {
  return (
    <FlexGap gap={16} style={{ width: "100%" }}>
      <FlexGap gap={6} direction="row">
        <TextInput
          style={{ width: "50%" }}
          label="Username:"
          placeholder="Digite um nome de usuário"
        />
        <TextInput
          label="Data de nascimento:"
          style={{ width: "50%" }}
          placeholder="Escolha a data"
        />
      </FlexGap>
      <TextInput label="E-mail:" placeholder="Digite seu e-mail" />
    </FlexGap>
  );
};
