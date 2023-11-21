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

type StoreTokensParams = Pick<AuthStorage, "access"> & {
  refreshToken?: string;
};

export const storeTokens = async ({
  access,
  refreshToken,
}: StoreTokensParams) => {
  await Promise.all([
    Store.setItemAsync(tokenKeys.access, access),
    refreshToken && Store.setItemAsync(tokenKeys.refreshToken, refreshToken),
  ]);
};
