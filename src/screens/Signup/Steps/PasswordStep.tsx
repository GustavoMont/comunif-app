import React from "react";
import { PasswordInput } from "@components/common/Form/PasswordInput";
import { FlexGap } from "@components/common/Layout/FlexGap";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { RegisterPayload } from "@src/models/User";

interface Props {
  control: Control<RegisterPayload>;
  error: FieldErrors<any>;
}

export const PasswordStep: React.FC<Props> = ({ control, error }) => {
  return (
    <FlexGap gap={16}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <PasswordInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error[name]?.message?.toString()}
            label="Senha:"
            placeholder="Digite uma senha forte"
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { name, onBlur, onChange, value } }) => (
          <PasswordInput
            label="Confirmar senha:"
            placeholder="Digite uma senha forte"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error[name]?.message?.toString() || ""}
          />
        )}
      />
    </FlexGap>
  );
};
