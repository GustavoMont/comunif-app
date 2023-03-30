import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { PasswordInput } from "./PasswordInput";
import { TextInput, InputProps } from "./TextInput";

interface Props extends InputProps {
  name: string;
  rules?:
    | globalThis.Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  control: Control<any, any>;
}
export const ControledInput: React.FC<Props> = ({
  name,
  rules,
  control,
  placeholder,
  secureTextEntry,
  label,
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => {
        const props = { value, label, placeholder };
        return secureTextEntry ? (
          <PasswordInput {...props} onChangeText={onChange} />
        ) : (
          <TextInput {...props} onChangeText={onChange} />
        );
      }}
    />
  );
};
