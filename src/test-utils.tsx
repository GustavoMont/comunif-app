import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { light } from "@styles/themes/light";
import { render, RenderOptions } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const navigationRef = createNavigationContainerRef();
  return (
    <SafeAreaView>
      <ThemeProvider theme={light}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <NavigationContainer ref={navigationRef}>
            {children}
          </NavigationContainer>
        </NativeBaseProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
