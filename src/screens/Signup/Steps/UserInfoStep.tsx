import { View } from "react-native";
import React from "react";
import { TextInput } from "../../../components/common/Form/InputText";
import { FlexGap } from "../../../components/common/Layout/FlexGap";
import { Control, Controller } from "react-hook-form";
import { RegisterPayload } from "../Signup";
import { DatePicker } from "@components/common/Form/DatePicker";
interface Props {
  control: Control<RegisterPayload>;
}

export const UserInfoStep: React.FC<Props> = ({ control }) => {
  return (
    <FlexGap gap={16} style={{ width: "100%" }}>
      <FlexGap gap={6} direction="row">
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ width: "50%" }}
              placeholder="Digite aqui seu primeiro nome:"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Nome:"
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={value}
              label="Data de nascimento:"
              onChange={onChange}
            />
          )}
        />
      </FlexGap>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite aqui seu email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Email:"
          />
        )}
      />
    </FlexGap>
  );
};
