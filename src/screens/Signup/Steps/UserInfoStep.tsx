import React from "react";
import { TextInput } from "../../../components/common/Form/TextInput";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DatePicker } from "@components/common/Form/DatePicker";
import { StyleSheet } from "react-native";
import { RegisterPayload } from "@src/models/User";
import { XStack, YStack } from "tamagui";
interface Props {
  control: Control<RegisterPayload>;
  error: FieldErrors<any>;
}

export const UserInfoStep: React.FC<Props> = ({ control, error }) => {
  return (
    <YStack gap={"$4"} style={styles.container}>
      <XStack gap={6}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextInput
              style={styles.inputs}
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
      </XStack>
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
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  inputs: { width: "50%" },
});
