import { fontWeight } from "../../styles/styled";
import { colorKeyType } from "../colors";

export interface Typograph {
  size?: number;
  color?: colorKeyType;
  weight?: keyof fontWeight;
  align?: "right" | "left" | "center";
}
