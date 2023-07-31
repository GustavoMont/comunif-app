import { Box, Divider, HStack, Heading, Text } from "native-base";
import React from "react";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline";
import { ColorType } from "native-base/lib/typescript/components/types";
import { colorKeyType } from "@src/types/colors";
import { AlertType } from "@src/hooks/useAppToast";

interface Props {
  title: string;
  message: string;
  type: AlertType;
}

interface BoxStyle {
  bg: ColorType;
  textColor: colorKeyType;
  dividerColor: ColorType;
}

const alertStyle: Record<AlertType, BoxStyle> = {
  error: {
    bg: "red.500",
    textColor: "white",
    dividerColor: "red.300",
  },
  success: {
    bg: "emerald.500",
    textColor: "white",
    dividerColor: "emerald.100",
  },
  warning: {
    bg: "orange.500",
    textColor: "white",
    dividerColor: "orange.300",
  },
};

export const ToastAlert: React.FC<Props> = ({ message, title, type }) => {
  const style = alertStyle[type];
  return (
    <Box
      borderWidth={1}
      borderColor={style.dividerColor}
      w={"full"}
      bg={style.bg}
      py={"5"}
      px={"4"}
      rounded={"lg"}
    >
      <HStack alignItems={"center"} space={3}>
        <DefaultIcon type={type} />

        <Heading
          fontFamily={"heading"}
          fontWeight={500}
          color={style.textColor}
        >
          {title}
        </Heading>
      </HStack>
      <Divider bg={style.dividerColor} my={"2"} />
      <Text
        fontSize={16}
        fontFamily={"body"}
        fontWeight={400}
        color={style.textColor}
      >
        {message}
      </Text>
    </Box>
  );
};

interface DefaultIconProps {
  type: AlertType;
}

const DefaultIcon: React.FC<DefaultIconProps> = ({ type }) => {
  const size = 24;
  const { textColor } = alertStyle[type];

  switch (type) {
    case "error":
      return (
        <ExclamationTriangleIcon width={size} height={size} color={textColor} />
      );
    case "success":
      return <CheckCircleIcon width={size} height={size} color={textColor} />;
    default:
      return (
        <InformationCircleIcon width={size} height={size} color={textColor} />
      );
  }
};
