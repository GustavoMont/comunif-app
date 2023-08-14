import { AuthStorage } from "@src/models/User";
import * as Store from "expo-secure-store";

export const tokenKeys = {
  access: "access",
  refreshToken: "rf_token",
};

export const deleteToken = async () =>
  await Promise.all([
    Store.deleteItemAsync(tokenKeys.access),
    Store.deleteItemAsync(tokenKeys.refreshToken),
  ]);

export const getAccessToken = async () => {
  const accessToken = await Store.getItemAsync(tokenKeys.access);

  return accessToken;
};

export const getRefreshToken = async () => {
  const refreshToken = await Store.getItemAsync(tokenKeys.refreshToken);

  return refreshToken;
};

export const storeTokens = async (token: AuthStorage) => {
  await Promise.all([
    Store.setItemAsync(tokenKeys.access, token.access),
    Store.setItemAsync(tokenKeys.refreshToken, token.refreshToken),
  ]);
};
