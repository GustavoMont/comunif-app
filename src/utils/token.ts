import { AuthStorage } from "@src/models/User";
import * as Store from "expo-secure-store";

export const accessKey = "access";

export const getToken = async () => {
  const json = await Store.getItemAsync(accessKey);

  if (json) {
    return (JSON.parse(json) as AuthStorage).access;
  }
  return json;
};
