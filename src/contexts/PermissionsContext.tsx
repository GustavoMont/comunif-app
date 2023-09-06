import { createContext } from "react";

interface Context {
  hasGalleryCameraPermission(): Promise<boolean>;
}

export const PermissionsContext = createContext<Context>({} as Context);
