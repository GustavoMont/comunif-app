import { apiUrl } from "@src/constants/api-constants";
import { colorKeyType } from "@src/types/colors";
import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { Avatar as TAvatar, AvatarProps, SizeTokens } from "tamagui";

type Size = "small" | "medium";

interface Props extends Omit<AvatarProps, "src" | "size"> {
  src?: string;
  fallback: {
    icon(props: SvgProps): JSX.Element;
    backgroundColor: colorKeyType;
  };
  size: Size;
}

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
    medium: {
      avatarSize: "$5",
      icon: 24,
    },
    small: {
      avatarSize: "$2",
      icon: 12,
    },
  };
  const { colors } = useTheme();
  const { backgroundColor, icon: Icon } = fallback;
  return (
    <TAvatar {...props} circular size={sizeHandler[size].avatarSize}>
      <TAvatar.Image
        testID={testID}
        source={{
          uri: src ? `${apiUrl}/${src}` : "http://aja",
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
