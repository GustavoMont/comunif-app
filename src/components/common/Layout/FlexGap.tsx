import styled from "styled-components/native";
import React, { Children } from "react";
import { ViewProps, View } from "react-native";

type direction = "row" | "column" | "row-reverse" | "column-reverse";

const Container = styled.View<{ direction?: direction }>`
  flex-direction: ${({ direction }) => direction || "column"};
`;

interface Props extends ViewProps {
  direction?: direction;
  gap?: number;
}

export const FlexGap: React.FC<Props> = ({
  direction,
  children,
  gap,
  ...props
}) => {
  const spacing = gap || 8;
  const spacingKey = direction?.includes("row") ? "width" : "height";
  return (
    <Container {...props} direction={direction}>
      {Children.map(children, (kid, index) => (
        <>
          {index === 0 ? <></> : <View style={{ [spacingKey]: spacing }} />}
          {kid}
        </>
      ))}
    </Container>
  );
};
