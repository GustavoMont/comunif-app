import { StyleSheet, TextProps, View } from "react-native";
import React from "react";
import { Typograph } from "../../../types/components/Typograph";
import { BodyText } from "./BodyText";
import { Title } from "./Title";
import { Link as Navigator } from "@react-navigation/native";

type linkType = "title" | "text";

interface LinkStyleProps extends TextProps, Typograph {
  type: linkType;
}

interface Props extends LinkStyleProps {
  screen: string;
  params?: any;
  icon?: JSX.Element;
}

const LinkStyleHandler = ({ type, ...props }: LinkStyleProps) => {
  switch (type) {
    case "text":
      return <BodyText {...(props as any)} style={styles.textStyle} />;
    case "title":
      return <Title {...(props as any)} style={styles.textStyle} />;
    default:
      throw new Error("You must pass a text type");
  }
};

export const Link: React.FC<Props> = ({
  params,
  screen,
  align,
  icon,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {icon && icon}
      <Navigator style={{ textAlign: align || "left" }} to={{ screen, params }}>
        <LinkStyleHandler {...props} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  textStyle: {
    textDecorationLine: "underline",
  },
});
