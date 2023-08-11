import React from "react";
import { ChannelTypeName } from "@src/models/ChannelType";
import {
  BookOpenIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { useTheme } from "styled-components/native";

interface Props {
  typeName: ChannelTypeName;
}

export const ChannelItemIcon: React.FC<Props> = ({ typeName }) => {
  const {
    icons: { size },
    colors,
  } = useTheme();

  switch (typeName) {
    case "doubt":
      return (
        <QuestionMarkCircleIcon
          testID="doubt-icon"
          color={colors.secondary}
          size={size.medium}
        />
      );
    case "jobs":
      return (
        <BriefcaseIcon
          testID="jobs-icon"
          size={size.medium}
          color={colors.secondary}
        />
      );
    case "material":
      return (
        <BookOpenIcon
          testID="material-icon"
          size={size.medium}
          color={colors.secondary}
        />
      );
    case "chat":
      return (
        <ChatBubbleBottomCenterIcon
          testID="chat-icon"
          size={size.medium}
          color={colors.secondary}
        />
      );
    default:
      return (
        <ChatBubbleOvalLeftIcon
          testID="default-icon"
          color={colors.secondary}
          size={size.medium}
        />
      );
  }
};
