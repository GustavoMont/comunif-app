import React from "react";
import RNDateTimePicker, {
  BaseProps,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";
import { Noop } from "react-hook-form";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CalendarIcon } from "react-native-heroicons/outline";
import { colorKeyType } from "src/types/colors";
import styled, { useTheme } from "styled-components/native";
import { FlexGap } from "../Layout/FlexGap";
import { BodyText } from "../Typograph/BodyText";
import { ErrorContainer } from "./ErrorContainer";

type width = number | `${number}%`;
interface ContainerStyleProps {
  width?: width;
}

const handleWidth = (width: width) => {
  return typeof width === "string" ? width : `$${width}px`;
};

const Container = styled.View<ContainerStyleProps>`
  width: ${({ width }) => (width ? handleWidth(width) : "100%")};
  flex-direction: column;
`;

const Input = styled.View<{ hasError?: boolean }>`
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.input.borderColor};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-radius: 4px;
  flex: 1;
`;

interface Props extends BaseProps, ContainerStyleProps {
  icon?: {
    size: number;
    color: colorKeyType;
  };
  label?: string;
  onChange: (...event: any[]) => void;
  errorMessage?: string;
  onBlur?: Noop;
}

export const DatePicker: React.FC<Props> = ({
  testID,
  icon,
  label,
  value,
  width,
  onChange,
  errorMessage,
  ...props
}) => {
  const { icons, input, colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const hasError = !!errorMessage;
  const handleChange = ({ nativeEvent }: DateTimePickerEvent) => {
    setShowDatePicker(false);
    const date = moment(nativeEvent.timestamp).toDate();
    onChange && onChange(date);
  };

  const handleInputTextColor = (hasError: boolean, value: Date) => {
    if (hasError) {
      return colors.error;
    } else {
      return value ? colors["black"] : input.placeholderColor;
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        testID={testID || ""}
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        <Container width={width}>
          {label && <BodyText>{label}</BodyText>}
          <Input hasError={hasError} testID="date-picker-input">
            <FlexGap gap={4} direction="row" style={styles.input}>
              <CalendarIcon
                size={icon?.size || icons.size.medium}
                color={handleInputTextColor(hasError, value)}
              />

              <BodyText
                style={{
                  color: handleInputTextColor(hasError, value),
                }}
              >
                {moment(value).format("DD/MM/YY")}
              </BodyText>
            </FlexGap>
          </Input>
          <ErrorContainer>
            {errorMessage && (
              <BodyText color="error" size={10}>
                {errorMessage}
              </BodyText>
            )}
          </ErrorContainer>
        </Container>
      </TouchableWithoutFeedback>
      {showDatePicker && (
        <RNDateTimePicker
          testID="date-picker"
          {...props}
          value={value || moment().toDate()}
          onChange={handleChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: { alignItems: "center", flex: 1, padding: 8 },
});
