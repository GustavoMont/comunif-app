import { DefaultTheme } from "styled-components";
import colors from "./colors";
import fonts from "./fonts";

export const light: DefaultTheme = {
  title: "light",
  colors,
  backgroundScreen: colors.white,
  fonts,
  input: {
    fontSize: 16,
    iconSize: 24,
    color: colors.lightBlack,
    placeholderColor: colors.darkWhite,
    borderColor: colors.lightBlack + "bb",
    backgroundColor: colors.white,
  },
  icons: {
    color: {
      button: colors.white,
    },
    size: {
      small: 16,
      medium: 24,
      large: 36,
    },
  },
};
