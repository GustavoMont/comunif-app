import React from "react";
import { fireEvent, render, screen } from "@src/test-utils";
import { ChannelItem } from "../ChannelItem";
import {
  channelTypeGenerator,
  communityChannelGenerator,
} from "@src/utils/generators";

describe("ChannelItem", () => {
  it("should render content", () => {
    const description = "descrição top";
    const name = "material";
    render(
      <ChannelItem
        onPress={jest.fn()}
        channel={communityChannelGenerator({
          channelType: channelTypeGenerator({ description, name }),
        })}
      />
    );
    expect(screen.getByText(description)).toBeOnTheScreen();
    expect(screen.getByText(description)).toBeOnTheScreen();
    expect(screen.getByTestId("material-icon")).toBeOnTheScreen();
  });
  it("should redirect to correct screen", () => {
    const onPress = jest.fn();
    render(
      <ChannelItem
        onPress={onPress}
        channel={communityChannelGenerator({ id: 7 })}
      />
    );
    fireEvent.press(screen.getByTestId("channel-item"));
    expect(onPress).toBeCalled();
  });
});
