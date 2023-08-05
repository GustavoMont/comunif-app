import styled from "styled-components/native";
import { Typograph } from "../../../types/components/Typograph";

const DEFAULT_SIZE = 24;

export const Title = styled.Text<Typograph>`
  font-size: ${({ size = DEFAULT_SIZE }) => size}px;
  font-family: ${({ theme, weight }) => theme.fonts.title[weight ?? 500]};
  color: ${({ theme, color }) => theme.colors[color || "black"]};
  text-align: ${({ align }) => align || "left"};
  height: ${({ size = DEFAULT_SIZE }) => size + 6}px;
`;
