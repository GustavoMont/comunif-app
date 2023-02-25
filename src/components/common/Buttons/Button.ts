import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  padding: 12px 32px;
  text-align: center;
  border-radius: 8px;
`;
