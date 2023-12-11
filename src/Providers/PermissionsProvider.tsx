import { PermissionsContext } from "@src/contexts/PermissionsContext";
import { PermissionStatus, useCameraPermissions } from "expo-image-picker";
import React, { PropsWithChildren } from "react";
import { Alert } from "react-native";

export const PermissionsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const hasGalleryCameraPermission = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Sem permissão para acessar câmera e galeria!",
        "Você precisa dar permissão para o aplicativo acessar a galeria"
      );
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    return true;
  };

  return (
    <PermissionsContext.Provider value={{ hasGalleryCameraPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};
