import { PermissionsContext } from "@src/contexts/PermissionsContext";
import { useContext } from "react";

export const usePermissions = () => useContext(PermissionsContext);
