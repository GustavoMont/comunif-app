import { View, Text, Omit } from "react-native";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { TextInput, InputProps } from "./InputText";

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
  label,
}) => {
  return (
    <Controller
      name={name}
      // rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput label={label} value={value} onChange={onChange} />
      )}
    />
  );
};
