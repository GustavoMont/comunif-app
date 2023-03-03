import RNDateTimePicker, {
  BaseProps,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import colors from "@styles/themes/colors";
import moment from "moment";
import { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { CalendarIcon } from "react-native-heroicons/outline";
import { colorKeyType } from "src/types/colors";
import styled, { useTheme } from "styled-components/native";
import { FlexGap } from "../Layout/FlexGap";
import { BodyText } from "../Typograph/BodyText";
import { InputProps } from "./TextInput";

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
  const hasError = !!errorMessage || true;
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
            <FlexGap
              gap={4}
              direction="row"
              style={{ flex: 1, alignItems: "center", padding: 8 }}
            >
              {!hasError && (
                <CalendarIcon
                  size={icon?.size || icons.size.medium}
                  color={icon?.color || colors["black"]}
                />
              )}
              <BodyText
                style={{
                  color: handleInputTextColor(hasError, value),
                }}
              >
                {errorMessage || moment(value).format("DD/MM/YY")}
              </BodyText>
            </FlexGap>
          </Input>
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
