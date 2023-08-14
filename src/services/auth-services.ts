import { AuthStorage } from "@src/models/User";
import api from "../config/axios";

export const validateRefreshToken = async (refreshToken: string) => {
  const { data } = await api.post<AuthStorage>("/auth/refresh-token", {
    refreshToken,
  });
  return data;
};

export const hashedEmailKey = "hashedEmail";

export interface ResetPasswordDto {
  email: string;
}

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

export interface ChangePassword {
  password: string;
  confirmPassword: string;
}
export const changePassword = async (body: ChangePassword) => {
  await api.patch("/auth/change-password", body);
};
