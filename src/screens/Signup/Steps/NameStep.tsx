import { RegisterPayload } from "@src/models/User";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextInput } from "../../../components/common/Form/TextInput";
import { YStack } from "tamagui";

interface Props {
  control: Control<RegisterPayload>;
  error: FieldErrors<any>;
}

export const NameStep: React.FC<Props> = ({ control, error }) => {
  return (
    <YStack gap={"$4"}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextInput
            placeholder="Digite aqui seu primeiro nome:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error[name]?.message?.toString()}
            label="Nome:"
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextInput
            placeholder="Digite aqui seu sobrenome:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error[name]?.message?.toString()}
            label="Sobrenome:"
          />
        )}
        name="lastName"
      />
    </YStack>
  );
};
