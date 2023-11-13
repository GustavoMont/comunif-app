import { Community } from "@src/models/Community";
import React from "react";
import { Modal, ModalProps } from "../common/Panels/Modal";
import { useQuery } from "@tanstack/react-query";
import { listCommunityMembers } from "@src/services/users-services";
import { UsersList } from "../user/UsersList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@src/types/navigation/protectedRoutes";
import { User } from "@src/models/User";
import { Title } from "../common/Typograph/Title";
import { YStack } from "tamagui";

interface Props extends Omit<ModalProps, "children"> {
  community: Community;
}

export const CommunityMembersModal: React.FC<Props> = ({
  community,
  isOpen,
  onClose,
}) => {
  const communityId = community.id;
  const navigation = useNavigation<StackNavigation>();
  const { data: membersResponse } = useQuery(
    ["community-members", communityId],
    () => listCommunityMembers(communityId)
  );
  const members = membersResponse?.results ?? [];
  const onSelectUser = ({ id: userId }: User) => {
    navigation.navigate("Profile", {
      userId,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <YStack mt={"$4"} space={"$4"}>
        <Title color="primary" align="center">
          Membros da Comunidade
        </Title>
        <UsersList onSelectUser={onSelectUser} users={members} />
      </YStack>
    </Modal>
  );
};
