import React from "react";
import { BodyText } from "@components/common/Typograph/BodyText";
import styled from "styled-components/native";
import { XStack } from "tamagui";
import { Avatar } from "@components/common/Content/Avatar";
import { UserIcon } from "react-native-heroicons/outline";
import { Message as IMessage } from "@src/models/Message";
import { User } from "@src/models/User";
import { TouchableOpacity } from "react-native";

interface Props {
  message: IMessage;
  isCurrentUser?: boolean;
  onPressUser?(user: User): void;
}

export const Message: React.FC<Props> = ({
  message,
  isCurrentUser,
  onPressUser,
}) => {
  const user = message.user;
  return (
    <MessageContainer testID="message" isCurrentUser={isCurrentUser}>
      <XStack
        flexDirection={isCurrentUser ? "row-reverse" : "row"}
        ai={"center"}
        space={"$1"}
      >
        <TouchableOpacity onPress={() => onPressUser?.(user)}>
          <Avatar
            size={"small"}
            fallback={{
              backgroundColor: isCurrentUser ? "primary" : "secondary",
              icon: UserIcon,
            }}
            src={user.avatar}
          />
        </TouchableOpacity>
        <BodyText>
          {isCurrentUser ? "Você" : `${user.name} ${user.lastName[0]}.`}
        </BodyText>
      </XStack>
      <MessageWrapper isCurrentUser={isCurrentUser}>
        <BodyText>{message.content}</BodyText>
      </MessageWrapper>
    </MessageContainer>
  );
};

interface MessageWrapperProps {
  isCurrentUser?: boolean;
}

const MessageWrapper = styled.View<MessageWrapperProps>`
  background-color: ${({ theme: { colors }, isCurrentUser }) =>
    isCurrentUser ? colors["lightPrimary"] : colors["lightSecondary"]};
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

const MessageContainer = styled.View<MessageWrapperProps>`
  align-self: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  max-width: 50%;
  align-items: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  gap: 4px;
  padding: 0px 4px;
`;
