import { AuthStorage, RegisterPayload, User } from "@src/models/User";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Store from "expo-secure-store";
import { api } from "@src/config/axios";
import jwtDecode from "jwt-decode";
import { accessKey, getToken } from "@src/utils/token";
interface Context {
  signedIn: boolean;
  signUp(body: RegisterPayload): Promise<void>;
}

const AuthContext = createContext<Context>({} as Context);

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
  const decodeToken = (token: string) =>
    jwtDecode<{ sub: number; username: string }>(token);

  const signUp = async (body: RegisterPayload) => {
    const { data } = await api.post<AuthStorage>(`/auth/signup`, body);
    await storeAccess(data);
    const { sub } = decodeToken(data.access);
    setUser(await getUser(sub));
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

    if (mounted && user) {
      setSignedIn(true);
      // navigate.navigate("Home");
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ signedIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
