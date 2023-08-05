import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { light } from "@styles/themes/light";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import React, { ReactElement } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { ToastProvider } from "@tamagui/toast";
import { CurrentToast } from "./components/common/Layout/CurrentToast";
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const client = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const navigationRef = createNavigationContainerRef();
  return (
    <SafeAreaProvider initialMetrics={inset}>
      <SafeAreaView>
        <ThemeProvider theme={light}>
          <QueryClientProvider client={client}>
            <TamaguiProvider config={config}>
              <ToastProvider>
                <CurrentToast />
                <NavigationContainer ref={navigationRef}>
                  {children}
                </NavigationContainer>
              </ToastProvider>
            </TamaguiProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
