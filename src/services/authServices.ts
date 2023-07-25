import { AuthStorage } from "@src/models/User";
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

export interface ConfirmCodeBody {
  code: string;
  email: string;
}

export const confirmCode = async (data: ConfirmCodeBody) => {
  const { data: access } = await api.post<AuthStorage>(
    `/auth/reset-password/confirm-code`,
    data
  );
  return access;
};
