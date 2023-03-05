import colors from "@src/styles/themes/colors";
import React from "react";
import { EyeIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { InputProps, TextInput } from "./TextInput";

export const PasswordInput: React.FC<InputProps> = (props) => {
  const { input } = useTheme();
  return (
    <TextInput
      rightIcon={<EyeIcon size={input.iconSize} color={input.color} />}
      {...props}
      secureTextEntry
    />
  );
};
