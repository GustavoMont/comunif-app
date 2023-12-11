import React from "react";
import { TooltipMenu } from "../common/Content/TooltipMenu/TooltipMenu";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import { colorKeyType } from "@src/types/colors";
import { useTheme } from "styled-components/native";
import { Community } from "@src/models/Community";
import { useBoolean } from "@src/hooks/useBoolean";
import { LeaveCommunityModal } from "./LeaveCommunityModal";

interface Props {
  community: Community | undefined;
}

export const CommunityDrawerOptions: React.FC<Props> = ({ community }) => {
  const { colors, icons } = useTheme();
  const { isOpen, close, open } = useBoolean();
  const options = [
    {
      name: "Sair da comunidade",
      icon: (
        <ArrowLeftOnRectangleIcon
          size={icons.size.medium}
          color={colors.secondary}
        />
      ),
      action: open,

      color: "secondary" as colorKeyType,
    },
  ];

  return (
    <>
      <TooltipMenu options={options} title="Opções" />
      {community ? (
        <LeaveCommunityModal
          close={close}
          community={community}
          isOpen={isOpen}
        />
      ) : null}
    </>
  );
};
