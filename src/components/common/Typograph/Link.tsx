import { TextProps } from "react-native";
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
}

const LinkStyleHandler = ({ type, ...props }: LinkStyleProps) => {
  switch (type) {
    case "text":
      return (
        <BodyText style={{ textDecorationLine: "underline" }} {...props} />
      );
    case "title":
      return <Title style={{ textDecorationLine: "underline" }} {...props} />;
    default:
      throw new Error("You must pass a text type");
  }
};

export const Link: React.FC<Props> = ({ params, screen, align, ...props }) => {
  return (
    <Navigator style={{ textAlign: align || "left" }} to={{ screen, params }}>
      <LinkStyleHandler {...props} />
    </Navigator>
  );
};
