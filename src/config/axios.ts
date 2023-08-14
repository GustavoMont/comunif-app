import { apiUrl } from "@src/constants/api-constants";
import { AuthStorage } from "@src/models/User";
import {
  deleteToken,
  getRefreshToken,
  getAccessToken,
  storeTokens,
} from "@src/utils/token";
import axios, { AxiosError } from "axios";
import { io } from "socket.io-client";

export const socket = io(apiUrl, {
  autoConnect: false,
});

const baseURL = `${apiUrl}/api`;

export const api = axios.create({
  baseURL,
});

const validateRefreshToken = async (refreshToken: string) => {
  const token = await getAccessToken();
  const { data } = await axios.post<AuthStorage>(
    `${baseURL}/auth/refresh-token`,
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => config,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      try {
        const refreshToken = await getRefreshToken();
        const credentials = await validateRefreshToken(refreshToken ?? "");
        await storeTokens(credentials);
      } catch (error) {
        await deleteToken();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
