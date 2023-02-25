import { DefaultTheme } from "styled-components";
import colors from "./colors";
import fonts from "./fonts";

export const light: DefaultTheme = {
  title: "light",
  colors,
  backgroundScreen: colors.white,
  fonts,
  input: {
    fontSize: 12,
    color: colors.lightBlack,
    placeholderColor: colors.darkWhite,
    borderColor: colors.lightBlack + "bb",
  },
};
