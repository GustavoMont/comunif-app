import React, { useEffect } from "react";
import { Separator, XStack, YStack } from "tamagui";
import { OptionsButton } from "../../Buttons/OptionsButton";
import { Modal, StyleSheet } from "react-native";
import { useBoolean } from "@src/hooks/useBoolean";
import { Title } from "../../Typograph/Title";
import { useTheme } from "styled-components/native";
import { TooltipContainer, TooltipContent } from "./TooltipMenuStyles";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorKeyType } from "@src/types/colors";
import { BodyText } from "../../Typograph/BodyText";
import { Button } from "../../Buttons/Button";
import { IconButton } from "../../Buttons/IconButton";
import { XMarkIcon } from "react-native-heroicons/outline";

export interface TooltipOption {
  name: string;
  action(): void | Promise<void>;
  color: colorKeyType;
  icon?: JSX.Element;
}

interface Props {
  title: string;
  options: TooltipOption[];
}

export const TooltipMenu: React.FC<Props> = ({ title, options }) => {
  const { colors } = useTheme();
  const { isOpen, toggle, close } = useBoolean();
  const scale = useSharedValue(0);
  const tooltipAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      } as never,
    ],
    opacity: scale.value,
  }));

  useEffect(() => {
    scale.value = withSpring(isOpen ? 1 : 0, {
      velocity: 20,
      damping: 18,
    });
  }, [isOpen]);

  return (
    <>
      <OptionsButton onPress={toggle} />

      <Modal transparent visible={isOpen}>
        <SafeAreaView style={styles.safeAreaView}>
          <TooltipContainer>
            <TooltipContent style={tooltipAnimatedStyle}>
              <YStack space={"$1"}>
                <XStack jc={"space-between"}>
                  <Title size={20} color="primary">
                    {title}
                  </Title>
                  <IconButton
                    onPress={close}
                    iconColor="darkWhite"
                    iconSize={20}
                    accessibilityLabel="Fechar opções"
                    icon={XMarkIcon}
                  />
                </XStack>
                <Separator borderColor={colors.primary} />
              </YStack>
              {options.map(({ color, name, icon, action }, i) => (
                <Button
                  leftIcon={icon}
                  color="none"
                  key={i.toString()}
                  onPress={() => {
                    toggle();
                    action();
                  }}
                >
                  <BodyText underlined color={color}>
                    {name}
                  </BodyText>
                </Button>
              ))}
            </TooltipContent>
          </TooltipContainer>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
