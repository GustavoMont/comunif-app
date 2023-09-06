import React from "react";
import { Community } from "@src/models/Community";
import styled, { useTheme } from "styled-components/native";
import { Title } from "../common/Typograph/Title";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { Dimensions } from "react-native";
import { Image } from "tamagui";
import { IconButton } from "../common/Buttons/IconButton";

interface Props {
  community: Community;
  onPressBack(): void;
}

export const CommunityHeader: React.FC<Props> = ({
  community,
  onPressBack,
}) => {
  const {
    icons: { size: iconSizes },
  } = useTheme();
  return (
    <Container>
      <HeaderTitleContainer>
        <IconButton
          onPress={onPressBack}
          iconSize={iconSizes.large}
          iconColor="primary"
          icon={ChevronLeftIcon}
          accessibilityLabel="Voltar"
          rounded
        />

        <Title weight={600} color="primary">
          {community.name}
        </Title>
      </HeaderTitleContainer>

      <Image
        source={{
          width: 200,
          height: 200,
          uri: community.banner ?? "http://la.com",
        }}
        w={Dimensions.get("screen").width}
      />
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  height: 176px;
  width: ${() => Dimensions.get("screen").width}px;
  top: 0;
  left: 0;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  overflow: hidden;
  z-index: 2;
`;

const HeaderTitleContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  border-bottom-right-radius: 20px;
  background-color: ${({ theme: { backgroundScreen } }) => backgroundScreen};
`;
