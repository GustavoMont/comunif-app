import { colorKeyType } from "@src/types/colors";
import React from "react";
import { useTheme } from "styled-components/native";
import { Separator } from "tamagui";

interface Props {
  color?: colorKeyType;
}

export const Divider: React.FC<Props> = ({ color = "primary" }) => {
  const { colors } = useTheme();
  return <Separator borderColor={colors[color]} w={"100%"} />;
};
