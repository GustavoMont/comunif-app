import { colorKeyType } from "@src/types/colors";
import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { Avatar as TAvatar, AvatarProps, SizeTokens } from "tamagui";

type Size = "small" | "medium" | "lg" | "xl";

interface Props extends Omit<AvatarProps, "src" | "size"> {
  src?: string;
  fallback: {
    icon(props: SvgProps): JSX.Element;
    backgroundColor: colorKeyType;
  };
  size: Size;
}

const handleAvatarUrl = (url: string) => {
  return url.replace("localhost", "10.0.2.2");
};

export const Avatar: React.FC<Props> = ({
  src,
  fallback,
  testID,
  size = "medium",
  ...props
}) => {
  interface SizeHandler {
    icon: number;
    avatarSize: SizeTokens;
  }
  const sizeHandler: Record<Size, SizeHandler> = {
    small: {
      avatarSize: "$2",
      icon: 12,
    },
    medium: {
      avatarSize: "$5",
      icon: 24,
    },
    lg: {
      avatarSize: "$10",
      icon: 40,
    },
    xl: {
      avatarSize: "$14",
      icon: 64,
    },
  };
  const { colors } = useTheme();
  const { backgroundColor, icon: Icon } = fallback;
  return (
    <TAvatar {...props} circular size={sizeHandler[size].avatarSize}>
      <TAvatar.Image
        testID={testID}
        source={{
          uri: src
            ? `${handleAvatarUrl(src)}?${new Date().getTime()}`
            : "http://aja",
        }}
      />

      <TAvatar.Fallback
        ai={"center"}
        jc={"center"}
        delayMs={600}
        backgroundColor={colors[backgroundColor]}
      >
        <Icon
          width={sizeHandler[size].icon}
          height={sizeHandler[size].icon}
          color={colors.white}
        />
      </TAvatar.Fallback>
    </TAvatar>
  );
};
