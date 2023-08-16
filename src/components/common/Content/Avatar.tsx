import { apiUrl } from "@src/constants/api-constants";
import { colorKeyType } from "@src/types/colors";
import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { Avatar as TAvatar, AvatarProps } from "tamagui";

interface Props extends Omit<AvatarProps, "src"> {
  src?: string;
  fallback: {
    icon(props: SvgProps): JSX.Element;
    backgroundColor: colorKeyType;
  };
}

export const Avatar: React.FC<Props> = ({
  src,
  fallback,
  testID,
  ...props
}) => {
  const { colors } = useTheme();
  const { backgroundColor, icon: Icon } = fallback;
  return (
    <TAvatar {...props} circular size={"$5"}>
      <TAvatar.Image
        testID={testID}
        source={{
          uri: src ? `${apiUrl}/${src}` : undefined,
        }}
      />

      <TAvatar.Fallback
        ai={"center"}
        jc={"center"}
        delayMs={600}
        backgroundColor={colors[backgroundColor]}
      >
        <Icon width={24} height={24} color={colors.white} />
      </TAvatar.Fallback>
    </TAvatar>
  );
};
