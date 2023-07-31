import styled from "styled-components/native";
import { Typograph } from "../../../types/components/Typograph";

export const Title = styled.Text<Typograph>`
  font-size: ${({ size }) => size || 24}px;
  font-family: ${({ theme, weight }) => theme.fonts.title[weight ?? 500]};
  color: ${({ theme, color }) => theme.colors[color || "black"]};
  text-align: ${({ align }) => align || "left"};
`;
