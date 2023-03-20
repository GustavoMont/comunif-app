import { useAuth } from "@src/contexts/auth";
import React from "react";
import FreeRoutes from "./FreeRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const Routes = () => {
  const { signedIn } = useAuth();
  return signedIn ? <ProtectedRoutes /> : <FreeRoutes />;
};
