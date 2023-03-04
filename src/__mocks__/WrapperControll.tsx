import React from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";

interface Props {
  children: React.FC<{ control: Control<any, any>; error: FieldErrors<any> }>;
}

export const WrapperControll: React.FC<Props> = ({ children: Children }) => {
  const {
    control,
    formState: { errors },
  } = useForm<any>();
  return <Children control={control} error={errors} />;
};
