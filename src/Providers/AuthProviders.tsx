import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  AuthStorage,
  LoginPayload,
  RegisterPayload,
  User,
} from "@src/models/User";

import { api } from "@src/config/axios";
import jwtDecode from "jwt-decode";
import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  storeTokens,
} from "@src/utils/token";
import { validateRefreshToken } from "@src/services/auth-services";
import { AuthContext } from "@src/contexts/auth";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const getUser = async (id: number) => {
    try {
      const { data: user } = await api.get<User>(`/users/${id}`);
      return user;
    } catch (error) {
      return null;
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    await deleteToken();
    setUser(null);
  };

  const decodeToken = (token: string) =>
    jwtDecode<{ sub: number; username: string }>(token);

  const setUserByToken = async (token: AuthStorage) => {
    await storeTokens(token);
    const { sub } = decodeToken(token.access);
    setUser(await getUser(sub));
  };

  const signUp = async (body: RegisterPayload) => {
    const { data } = await api.post<AuthStorage>(`/auth/signup`, body);

    await setUserByToken(data);
  };

  const login = async (body: LoginPayload) => {
    const { data } = await api.post<AuthStorage>(`/auth/login`, body);
    await setUserByToken(data);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const setAuthInfo = async () => {
        setIsCheckingToken(true);
        const [token, refreshToken] = await Promise.all([
          getAccessToken(),
          getRefreshToken(),
        ]);
        if (token && refreshToken) {
          try {
            const credentials = await validateRefreshToken(refreshToken);
            await setUserByToken(credentials);
          } catch (error) {
            await deleteToken();
          }
        }
        setIsCheckingToken(false);
      };
      setAuthInfo();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setSignedIn(!!user);
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signedIn,
        isCheckingToken,
        signUp,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
