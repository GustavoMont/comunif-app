import {
  AuthStorage,
  LoginPayload,
  RegisterPayload,
  User,
} from "@src/models/User";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import * as Store from "expo-secure-store";
import { api } from "@src/config/axios";
import jwtDecode from "jwt-decode";
import { accessKey, deleteToken, getToken } from "@src/utils/token";

type signUp = (body: RegisterPayload) => Promise<void>;
type login = (body: LoginPayload) => Promise<void>;

interface Context {
  signedIn: boolean;
  signUp: signUp;
  login: login;
  logout(): Promise<void>;
}

export const AuthContext = createContext<Context>({} as Context);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const storeAccess = async (token: AuthStorage) => {
    await Store.setItemAsync(accessKey, JSON.stringify(token));
  };

  const getUser = async (id: number) => {
    try {
      const { data: user } = await api.get<User>(`/users/${id}`);
      return user;
    } catch (error) {
      return null;
    }
  };

  const logout = async () => {
    await deleteToken();
    setUser(null);
  };

  const decodeToken = (token: string) =>
    jwtDecode<{ sub: number; username: string }>(token);

  const setUserByToken = async (token: AuthStorage) => {
    await storeAccess(token);
    const { sub } = decodeToken(token.access);
    setUser(await getUser(sub));
  };

  const signUp: signUp = async (body) => {
    const { data } = await api.post<AuthStorage>(`/auth/signup`, body);
    await setUserByToken(data);
  };

  const login: login = async (body) => {
    const { data } = await api.post<AuthStorage>(`/auth/login`, body);
    await setUserByToken(data);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const token = await getToken();
        if (token) {
          const { sub } = decodeToken(token);

          setUser(await getUser(sub));
        }
      })();
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
    <AuthContext.Provider value={{ signedIn, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
