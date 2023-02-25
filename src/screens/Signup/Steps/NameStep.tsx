import {} from "react-native";
import React from "react";
import { TextInput } from "../../../components/common/Form/InputText";

export const NameStep = () => {
  return (
    <>
      <TextInput
        label="Primeiro nome:"
        placeholder="Digite aqui seu primeiro nome"
      />
      <TextInput label="Sobrenome:" placeholder="Digite seu sobre nome" />
    </>
  );
};
