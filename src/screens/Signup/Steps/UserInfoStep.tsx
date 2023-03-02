import { View } from "react-native";
import React from "react";
import { TextInput } from "../../../components/common/Form/InputText";
import { FlexGap } from "../../../components/common/Layout/FlexGap";
import { Control, Controller } from "react-hook-form";
import { RegisterPayload } from "../Signup";
import { ControledInput } from "@components/common/Form/ControledInput";
import moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";
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
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{ width: "50%" }}
              label="Username:"
              onChange={onChange}
              value={value}
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
        {/* <TextInput
          style={{ width: "50%" }}
          label="Username:"
          placeholder="Digite um nome de usuário"
        /> */}
      </FlexGap>
      <TextInput label="E-mail:" placeholder="Digite seu e-mail" />
    </FlexGap>
  );
};
