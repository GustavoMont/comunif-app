import { View } from "react-native";
import React from "react";
import { TextInput } from "../../../components/common/Form/TextInput";
import { FlexGap } from "../../../components/common/Layout/FlexGap";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { RegisterPayload } from "../Signup";
import { DatePicker } from "@components/common/Form/DatePicker";
interface Props {
  control: Control<RegisterPayload>;
  error: FieldErrors<any>;
}

export const UserInfoStep: React.FC<Props> = ({ control, error }) => {
  return (
    <FlexGap gap={16} style={{ width: "100%" }}>
      <FlexGap gap={6} direction="row">
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextInput
              style={{ width: "50%" }}
              placeholder="Digite um nome de usuário"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={error[name]?.message?.toString()}
              label="Username:"
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field: { onChange, value, name, onBlur } }) => (
            <DatePicker
              errorMessage={error[name]?.message?.toString()}
              width={"50%"}
              value={value}
              onBlur={onBlur}
              label="Data de nascimento:"
              onChange={onChange}
            />
          )}
        />
      </FlexGap>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextInput
            placeholder="Digite seu e-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error[name]?.message?.toString()}
            label="E-mail:"
          />
        )}
      />
    </FlexGap>
  );
};
