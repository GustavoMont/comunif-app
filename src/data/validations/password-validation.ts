import * as yup from "yup";

export const passwordValidation = yup.object({
  password: yup
    .string()
    .required("Senha é um campo obrigatório")
    .matches(
      /^(?=.*[A-Za-z])(?=.*?[0-9]).{8,}$/,
      "Senha precisa ter no mínimo 8 caractéres, uma letra e um número"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Senhas não coincidem")
    .nullable()
    .required("Confirm password is required"),
});
