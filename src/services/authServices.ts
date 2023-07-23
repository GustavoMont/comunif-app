import api from "../config/axios";

export interface ResetPasswordDto {
  email: string;
}

export const hashedEmailKey = "hashedEmail";

export const resetPassword = async ({ email }: ResetPasswordDto) => {
  const {
    data: { email: hashedEmail },
  } = await api.post<{ email: string }>("/auth/reset-password", {
    email,
  });
  return hashedEmail;
};
