import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { InputProps, TextInput } from "./TextInput";

export const PasswordInput: React.FC<InputProps> = (props) => {
  const { input } = useTheme();
  const iconProps = { size: input.iconSize, color: input.color };
  const [isHidden, setIsHidden] = useState(true);
  return (
    <TextInput
      rightIcon={
        <TouchableOpacity onPress={() => setIsHidden((prev) => !prev)}>
          {isHidden ? (
            <EyeIcon {...iconProps} />
          ) : (
            <EyeSlashIcon {...iconProps} />
          )}
        </TouchableOpacity>
      }
      {...props}
      secureTextEntry={isHidden}
    />
  );
};
