import { colorKeyType } from "../colors";

export interface CircleProps {
  size: number;
  position: Position;
  color: colorKeyType;
}

export interface Position {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
