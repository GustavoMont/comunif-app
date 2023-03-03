import { ControledInput } from "@components/common/Form/ControledInput";
import { FlexGap } from "@components/common/Layout/FlexGap";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextInput } from "../../../components/common/Form/TextInput";
import { RegisterPayload } from "../Signup";

interface Props {
  control: Control<RegisterPayload>;
  error?: FieldErrors<any>;
}

export const NameStep: React.FC<Props> = ({ control, error }) => {
  return (
    <FlexGap gap={16}>
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
            errorMessage={error?.[name]?.message?.toString()}
            label="Nome:"
          />
        )}
        name="name"
      />

      {/* <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite aqui seu sobrenome:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Sobrenome:"
          />
        )}
        name="lastName"
      /> */}
    </FlexGap>
  );
};
