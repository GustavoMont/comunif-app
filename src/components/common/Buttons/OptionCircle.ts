import styled from "styled-components/native";

export const OptionCircle = styled.View`
  width: 4px;
  height: 4px;
  background-color: ${({ theme: { colors } }) => colors.darkWhite};
  border-radius: 120px;
`;
