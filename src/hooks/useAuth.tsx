import { AuthContext } from "@src/contexts/auth";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
