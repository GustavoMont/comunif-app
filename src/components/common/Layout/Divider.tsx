import { colorKeyType } from "@src/types/colors";
import styled from "styled-components/native";

interface Props {
  color?: colorKeyType;
}

export const Divider = styled.View<Props>`
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-color: ${({ color = "primary", theme: { colors } }) => colors[color]};
  height: 1px;
  border-radius: 10px;
`;
