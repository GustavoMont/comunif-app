import "styled-components";
import { colorType } from "../types/colors";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: colorType;
    backgroundScreen: string;
  }
}
