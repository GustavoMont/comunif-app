import styled from "styled-components/native";

export const TextInput = styled.TextInput.attrs(({ theme, ...props }) => ({
  placeholderTextColor: theme.input.placeholderColor,
  ...props,
}))`
  border: 1.5px solid ${({ theme }) => theme.input.borderColor};
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  font-family: ${({ theme }) => theme.fonts.text[500]};
  font-size: ${({ theme }) => theme.input.fontSize}px;
  color: ${({ theme }) => theme.input.color};
`;
