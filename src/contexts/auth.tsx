import { LoginPayload, RegisterPayload, User } from "@src/models/User";
import { createContext } from "react";

type signUp = (body: RegisterPayload) => Promise<void>;
type login = (body: LoginPayload) => Promise<void>;

interface Context {
  signedIn: boolean;
  user: User | null;
  isCheckingToken: boolean;
  updateUser(user: User): void;
  signUp: signUp;
  login: login;
  logout(): Promise<void>;
}

export const AuthContext = createContext<Context>({} as Context);
