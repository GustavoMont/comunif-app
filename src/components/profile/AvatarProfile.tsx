import React from "react";
import styled from "styled-components/native";
import { Avatar } from "../common/Content/Avatar";
import { UserIcon } from "react-native-heroicons/outline";

interface Props {
  avatar?: string;
}

export const AvatarProfile: React.FC<Props> = ({ avatar }) => {
  return (
    <Container>
      <Avatar
        size="xl"
        fallback={{
          backgroundColor: "lightSecondary",
          icon: UserIcon,
        }}
        src={avatar}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 4px;
  border-radius: 800px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-self: flex-start;
`;
