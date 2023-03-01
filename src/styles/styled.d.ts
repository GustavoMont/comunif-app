import "styled-components";
import { colorType } from "../types/colors";

type fontWeight = {
  600: string;
  500: string;
  400: string;
  300: string;
};

type fonts = {
  title: fontWeight;
  text: fontWeight;
};
declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: colorType;
    backgroundScreen: string;
    input: {
      fontSize: number;
      color: string;
      placeholderColor: string;
      borderColor: string;
    };
    fonts: fonts;
    icons: {
      size: {
        small: number;
        medium: number;
        large: number;
      };
      color: {
        button: string;
      };
    };
  }
}
