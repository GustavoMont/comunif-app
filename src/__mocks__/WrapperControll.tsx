import React from "react";
import { Control, useForm } from "react-hook-form";

interface Props {
  children: React.FC<{ control: Control<any, any> }>;
}

export const WrapperControll: React.FC<Props> = ({ children: Children }) => {
  const { control } = useForm<any>();
  return <Children control={control} />;
};
