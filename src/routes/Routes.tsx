import { useAuth } from "@src/hooks/useAuth";
import React from "react";
import FreeRoutes from "./FreeRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const Routes = () => {
  const { signedIn } = useAuth();
  console.log(signedIn);

  return signedIn ? <ProtectedRoutes /> : <FreeRoutes />;
};
