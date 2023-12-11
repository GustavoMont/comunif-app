import React from "react";
import {
  TooltipMenu,
  TooltipOption,
} from "../common/Content/TooltipMenu/TooltipMenu";
import {
  ArrowLeftOnRectangleIcon,
  UserGroupIcon,
} from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";
import { useBoolean } from "@src/hooks/useBoolean";
import { LeaveCommunityModal } from "./LeaveCommunityModal";
import { Community } from "@src/models/Community";
import { CommunityMembersModal } from "./CommunityMembersModal";

interface Props {
  community: Community;
}

export const CommunityOptions: React.FC<Props> = ({ community }) => {
  const { colors, icons } = useTheme();
  const {
    isOpen: isMembersOpen,
    open: openMembers,
    close: closeMembers,
  } = useBoolean();
  const {
    isOpen: isLeaveOpen,
    open: openLeave,
    close: closeLeave,
  } = useBoolean();

  const options: TooltipOption[] = [
    {
      name: "Ver membros da comunidade",
      action: openMembers,
      color: "primary",
      icon: <UserGroupIcon color={colors.primary} size={icons.size.medium} />,
    },
    {
      name: "Sair da comunidade",
      icon: (
        <ArrowLeftOnRectangleIcon
          size={icons.size.medium}
          color={colors.secondary}
        />
      ),
      action: openLeave,

      color: "secondary",
    },
  ];

  return (
    <>
      <TooltipMenu options={options} title="Opções" />

      <LeaveCommunityModal
        close={closeLeave}
        community={community}
        isOpen={isLeaveOpen}
      />
      <CommunityMembersModal
        isOpen={isMembersOpen}
        onClose={closeMembers}
        community={community}
      />
    </>
  );
};
