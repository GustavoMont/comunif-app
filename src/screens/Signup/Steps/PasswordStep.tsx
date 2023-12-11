import React from "react";
import { PasswordInput } from "@components/common/Form/PasswordInput";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { RegisterPayload } from "@src/models/User";
import { YStack } from "tamagui";

interface Props {
  control: Control<RegisterPayload>;
  error: FieldErrors<any>;
}

export const PasswordStep: React.FC<Props> = ({ control, error }) => {
  return (
    <YStack gap={"$4"}>
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
    </YStack>
  );
};
