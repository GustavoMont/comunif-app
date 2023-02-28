import { View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { BodyText } from "@components/common/Typograph/BodyText";
import { FlexGap } from "@components/common/Layout/FlexGap";

export const ComunitiesStep = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <>
      <View>
        <FlexGap gap={8}>
          <BodyText>Quais comunidades você tem interesse?</BodyText>
          <DropDownPicker
            items={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
            ]}
            open={open}
            value={value}
            setValue={setValue}
            setOpen={setOpen}
            placeholder="Selecione uma opção"
          />
          <BodyText color="darkWhite">Nenhuma comunidade selecionada</BodyText>
        </FlexGap>
      </View>
    </>
  );
};
