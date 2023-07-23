import styled from "styled-components/native";
import { Typograph } from "../../../types/components/Typograph";

export const ButtonText = styled.Text<Typograph>`
  font-size: ${({ size }) => size || 16}px;
  font-family: ${({ theme, weight }) => theme.fonts.text[weight || 500]};
  color: ${({ theme, color }) => theme.colors[color || "black"]};
  text-align: ${({ align }) => align || "center"};
  line-height: 28px;
`;
