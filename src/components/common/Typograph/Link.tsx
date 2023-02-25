import { TextProps } from "react-native";
import React from "react";
import { Typograph } from "../../../types/components/Typograph";
import { BodyText } from "./BodyText";
import { Title } from "./Title";

interface Props extends TextProps, Typograph {
  type: "title" | "text";
}

export const Link: React.FC<Props> = ({ type, ...props }) => {
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
