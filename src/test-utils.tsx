import { light } from "@styles/themes/light";
import { render, RenderOptions } from "@testing-library/react-native";
import React, { ReactElement } from "react";
import { ThemeProvider } from "styled-components/native";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={light}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
