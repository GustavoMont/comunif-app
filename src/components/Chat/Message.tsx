import React from "react";
import { BodyText } from "@components/common/Typograph/BodyText";
import styled from "styled-components/native";

interface Props extends MessageContainerProps {
  message: string;
}

export const Message: React.FC<Props> = ({ message, isCurrentUser }) => {
  return (
    <MessageContainer isCurrentUser={isCurrentUser} testID="message">
      <BodyText>{message}</BodyText>
    </MessageContainer>
  );
};

interface MessageContainerProps {
  isCurrentUser?: boolean;
}

const handleMargin = (isCurrentUser: boolean, margin: "left" | "right") => {
  if (margin === "left") {
    return isCurrentUser ? "auto" : "0";
  }
  return !isCurrentUser ? "auto" : "0";
};

const MessageContainer = styled.View<MessageContainerProps>`
  background-color: ${({ theme: { colors }, isCurrentUser }) =>
    isCurrentUser ? colors["lightPrimary"] : colors["lightSecondary"]};
  margin-left: ${({ isCurrentUser }) => handleMargin(!!isCurrentUser, "left")};
  margin-right: ${({ isCurrentUser }) =>
    handleMargin(!!isCurrentUser, "right")};
  padding: 12px 16px;
  ${({ isCurrentUser }) =>
    isCurrentUser
      ? `
    border-top-left-radius:  8px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 32px;  
    border-bottom-left-radius: 8px;
  `
      : ` 
    border-top-left-radius:  0px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;  
    border-bottom-left-radius: 32px;
  `}
`;
