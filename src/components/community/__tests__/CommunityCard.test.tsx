import React from "react";
import { fireEvent, render, screen } from "@src/test-utils";
import { communityGenerator } from "@src/utils/generators";
import { CommunityCard } from "../CommunityCard";
import { light } from "@src/styles/themes/light";

describe("CommunityCard Component", () => {
  it("should have non-member style", () => {
    const onAccess = jest.fn();
    const onTurnMember = jest.fn();
    const community = communityGenerator();
    render(
      <CommunityCard
        onAccess={onAccess}
        onTurnMember={onTurnMember}
        community={community}
      />
    );
    const card = screen.getByTestId("community-card");
    expect(card.props.style[0].backgroundColor).toBe(light.backgroundScreen);
    expect(screen.getByText(community.name)).toBeOnTheScreen();
    expect(screen.getByText(`Assunto: ${community.subject}`)).toBeOnTheScreen();
    expect(screen.getByTestId("community-banner")).toBeOnTheScreen();
    const button = screen.getByRole("button", {
      name: /Virar membro/i,
    });
    expect(button).toBeOnTheScreen();
    fireEvent.press(button);
    expect(onAccess).not.toBeCalled();
    expect(onTurnMember).toBeCalled();
  });
  it("should have member style", () => {
    const onAccess = jest.fn();
    const onTurnMember = jest.fn();
    const community = communityGenerator({ isMember: true });
    render(
      <CommunityCard
        onAccess={onAccess}
        onTurnMember={onTurnMember}
        community={community}
      />
    );
    const card = screen.getByTestId("community-card");
    expect(card.props.style[0].backgroundColor).toBe(light.colors.primary);
    const button = screen.getByRole("button", {
      name: /Acessar/i,
    });
    expect(button);
    expect(button).toBeOnTheScreen();
    fireEvent.press(button);
    expect(onTurnMember).not.toBeCalled();
    expect(onAccess).toBeCalled();
  });
});
