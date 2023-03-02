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

interface ContainerStyleProps {
  width?: number | `${number}%`;
}

const Container = styled.View<ContainerStyleProps>`
  width: 50%;
  flex-direction: column;
`;

const Input = styled.View`
  border: 2px solid ${({ theme }) => theme.input.borderColor};
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
}

export const DatePicker: React.FC<Props> = ({
  testID,
  icon,
  label,
  value,
  width,
  onChange,
  ...props
}) => {
  const { icons, input } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChange = ({ nativeEvent }: DateTimePickerEvent) => {
    setShowDatePicker(false);
    const date = moment(nativeEvent.timestamp).toDate();
    onChange && onChange(date);
  };
  return (
    <>
      <TouchableWithoutFeedback
        testID={testID || ""}
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        <Container>
          {label && <BodyText>{label}</BodyText>}
          <Input testID="date-picker-input">
            <FlexGap
              gap={4}
              direction="row"
              style={{ flex: 1, alignItems: "center", padding: 8 }}
            >
              <CalendarIcon
                size={icon?.size || icons.size.medium}
                color={icon?.color || colors["black"]}
              />
              <BodyText
                style={{
                  color: value ? colors["black"] : input.placeholderColor,
                }}
              >
                {moment(value).format("DD/MM/YY")}
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
