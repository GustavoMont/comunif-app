import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@src/test-utils";
import { CommunityChannelScreen } from "../CommunityChannelScreen";
import { CommunityChannelProps } from "@src/types/navigation/protectedRoutes";
import * as communityServices from "@services/communities-services";
import {
  arrayGenerator,
  communityChannelGenerator,
  communityGenerator,
} from "@src/utils/generators";
import { apiUrl } from "@src/constants/api-constants";

jest.mock("@services/communities-services", () => ({
  getCommunity: jest.fn(),
}));

describe("CommunityChannel Screen", () => {
  afterEach(cleanup);
  describe("user is not member", () => {
    afterEach(cleanup);
    it("should redirect to all communities screen", async () => {
      const navigation = {
        navigate: jest.fn(),
      };
      const route = {
        params: {
          communityId: 1,
        },
      };
      const props = { navigation, route };
      jest
        .spyOn(communityServices, "getCommunity")
        .mockResolvedValue(
          communityGenerator({ isMember: false, banner: "banner.com" })
        );
      render(
        <CommunityChannelScreen
          {...(props as unknown as CommunityChannelProps)}
        />
      );
      await waitFor(() => {
        expect(communityServices.getCommunity).toBeCalledWith(
          route.params.communityId
        );
      });
      await waitFor(() => {
        expect(navigation.navigate).toBeCalledWith("AllCommunities");
      });
    });
  });
  describe("user is community member", () => {
    const community = communityGenerator({
      isMember: true,
      banner: "banner.com",
      communityChannels: arrayGenerator(2, communityChannelGenerator),
    });
    const navigation = {
      navigate: jest.fn(),
    };
    const route = {
      params: {
        communityId: 1,
        channelId: 1,
      },
    };
    const props = { navigation, route };

    beforeEach(() => {
      jest
        .spyOn(communityServices, "getCommunity")
        .mockResolvedValue(community);
    });
    afterEach(cleanup);
    it("should have all content", async () => {
      const navigation = {
        navigate: jest.fn(),
      };
      const route = {
        params: {
          communityId: 1,
        },
      };
      const props = { navigation, route };
      render(
        <CommunityChannelScreen
          {...(props as unknown as CommunityChannelProps)}
        />
      );
      await waitFor(() => {
        expect(communityServices.getCommunity).toBeCalledWith(
          route.params.communityId
        );
      });
      expect(await screen.findByText(community.name)).toBeOnTheScreen();
      const image = screen.getByTestId("community-pic");
      expect(image).toBeOnTheScreen();
      const bannerUrl = image.props.source.uri;
      expect(bannerUrl).toBe(`${apiUrl}/${community.banner}`);
    });
    it("should back to community screen", () => {
      render(
        <CommunityChannelScreen
          {...(props as unknown as CommunityChannelProps)}
        />
      );
      const backButton = screen.getByLabelText("Voltar");
      fireEvent.press(backButton);
      expect(navigation.navigate).toBeCalledWith("Community", {
        id: 1,
      });
    });
    it("should disable send button when no message typed", async () => {
      render(
        <CommunityChannelScreen
          {...(props as unknown as CommunityChannelProps)}
        />
      );
      await waitFor(() => {
        expect(communityServices.getCommunity).toBeCalledWith(
          route.params.communityId
        );
      });
      const message = "olá, mundo";
      const messageInput = screen.getByPlaceholderText(
        /Digite sua mensgaem\.\.\.\./
      );
      const sendButton = screen.getByLabelText(/Enviar mensage/);
      expect(sendButton).toBeDisabled();
      fireEvent.changeText(messageInput, message);
      expect(sendButton).toBeEnabled();
    });
    it.todo("should use socket io to communicate");
  });
});
