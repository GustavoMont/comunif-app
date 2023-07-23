import React, { PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const KeyboardCloser: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};
