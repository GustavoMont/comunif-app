import React from "react";
import { AlertType } from "@src/hooks/useAppToast";
import { ColorTokens } from "tamagui";
import { Toast, ToastViewport, useToastState } from "@tamagui/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export const CurrentToast = () => {
  const currentToast = useToastState();

  const { left, top, right } = useSafeAreaInsets();

  if (!currentToast || currentToast.isHandledNatively) return null;

  interface CustomData {
    type: AlertType;
  }
  const customData: CustomData = currentToast?.customData as CustomData;

  return (
    <>
      <ToastViewport top={top} left={left} right={right} />
      <Toast
        key={currentToast.id}
        duration={currentToast.duration}
        enterStyle={styles.enterStyle}
        exitStyle={styles.exitStyle}
        y={0}
        opacity={1}
        scale={1}
        animation="quick"
        backgroundColor={handleAlertColor(customData.type)}
        viewportName={currentToast.viewportName}
      >
        <Toast.Title fontSize={"$6"}>{currentToast.title}</Toast.Title>
        {currentToast.message ? (
          <Toast.Description fontSize={"$2"} color={"#fff"}>
            {currentToast.message}
          </Toast.Description>
        ) : (
          <></>
        )}
      </Toast>
    </>
  );
};

const handleAlertColor = (type: AlertType): ColorTokens => {
  switch (type) {
    case "error":
      return "$red10";
    case "success":
      return "$green10";
    case "warning":
      return "$orange10Dark";
    default:
      return "$gray10";
  }
};

const styles = StyleSheet.create({
  enterStyle: { opacity: 0, scale: 0.5, y: -25 },
  exitStyle: { opacity: 0, scale: 1, y: -20 },
});
