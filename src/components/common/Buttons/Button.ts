import styled from "styled-components/native";

interface ButtonProps {
  minSize?: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary};
  ${({ minSize }) => (!!minSize ? "" : "width: 100%;")}
  padding: 12px 32px;
  text-align: center;
  border-radius: 8px;
  flex-direction: row;
  justify-items: center;
`;
