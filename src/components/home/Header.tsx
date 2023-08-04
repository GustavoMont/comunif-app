import React from "react";
import { HStack } from "native-base";
import { Title } from "../common/Typograph/Title";
import { User } from "@src/models/User";

interface Props {
  user: User;
}

export const Header: React.FC<Props> = ({ user }) => {
  return (
    <HStack>
      <Title size={20} color="primary">
        Bem vindo(a), {user.name}
      </Title>
    </HStack>
  );
};
