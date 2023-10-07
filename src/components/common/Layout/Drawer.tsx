import React, { PropsWithChildren, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
  drawerContent: JSX.Element;
  isOpen: boolean;
  handleDrawerState(isOpen: boolean): void;
}

export const Drawer: React.FC<PropsWithChildren<Props>> = ({
  drawerContent,
  children,
  handleDrawerState,
  isOpen,
}) => {
  const INITIAL_RIGHT_VALUE = -2000;
  const right = useSharedValue(INITIAL_RIGHT_VALUE);
  const opacity = useSharedValue(0);
  const updateOpacity = (value: number) => {
    opacity.value = withTiming(value, {
      duration: 490,
      easing: Easing.inOut(Easing.quad),
    });
  };
  const updateRight = (value: number) => {
    right.value = withSpring(value, {
      damping: 18,
    });
  };
  const openDrawer = () => {
    handleDrawerState(true);
  };
  const closeDrawer = () => {
    handleDrawerState(false);
  };

  const onCloseDrawer = () => {
    updateOpacity(0);
    updateRight(INITIAL_RIGHT_VALUE);
  };
  const onOpenDrawer = () => {
    updateOpacity(0.8);
    updateRight(0);
  };
  const onFlingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(openDrawer);
  const onFlingRight = Gesture.Fling().onEnd(closeDrawer);
  const drawerPositionStyle = useAnimatedStyle(() => ({
    right: right.value,
  }));
  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    zIndex: opacity.value > 0 ? 99 : 0,
  }));
  const gesture = Gesture.Race(onFlingLeft, onFlingRight);

  useEffect(() => {
    if (isOpen) {
      return onOpenDrawer();
    }
    onCloseDrawer();
  }, [isOpen]);

  return (
    <GestureDetector gesture={gesture}>
      <Container>
        <Overlay style={overlayAnimatedStyle}>
          <Pressable onPress={closeDrawer} style={styles.pressable}></Pressable>
        </Overlay>

        <DrawerBody style={drawerPositionStyle}>{drawerContent}</DrawerBody>
        {children}
      </Container>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});

const Container = styled.View`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const Overlay = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme: { colors } }) => colors.darkblack};
`;

const DrawerBody = styled(Animated.View)`
  background-color: ${({ theme: { backgroundScreen } }) => backgroundScreen};
  width: 80%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  padding: 24px;
`;
