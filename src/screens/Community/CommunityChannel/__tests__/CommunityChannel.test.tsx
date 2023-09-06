import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@src/test-utils";
import { CommunityChannelScreen } from "../CommunityChannelScreen";
import { CommunityChannelProps } from "@src/types/navigation/protectedRoutes";
import * as communityServices from "@services/communities-services";
import {
  arrayGenerator,
  communityChannelGenerator,
  communityGenerator,
  messageGenerator,
  userGenarator,
} from "@src/utils/generators";
import { useAuth } from "@src/hooks/useAuth";
import * as messagesServices from "@src/services/messages-services";
import { ListResponse } from "@src/models/ApiResponse";
import { Message } from "@src/models/Message";

jest.mock("@services/communities-services", () => ({
  getCommunity: jest.fn(),
}));

jest.mock("@src/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@src/services/messages-services", () => ({
  listChannelMessages: jest.fn(),
}));

const response: ListResponse<Message> = {
  meta: {
    page: 1,
    pageCount: 20,
    pages: 1,
    total: 20,
  },
  results: arrayGenerator(20, messageGenerator),
};

describe("CommunityChannel Screen", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: userGenarator(),
    });
  });
  afterEach(cleanup);
  describe("user is not member", () => {
    beforeEach(() => {
      jest
        .spyOn(messagesServices, "listChannelMessages")
        .mockResolvedValue(response);
    });
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
      expect(bannerUrl).toContain(community.banner);
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
        /Digite sua mensagem\.\.\.\./
      );
      const sendButton = screen.getByLabelText(/Enviar mensage/);
      expect(sendButton).toBeDisabled();
      fireEvent.changeText(messageInput, message);
      expect(sendButton).toBeEnabled();
    });
    it("should populate messages", async () => {
      const navigate = jest.fn();
      const goBack = jest.fn();
      const props = {
        route: {
          params: { id: community.id, channelId: 1 },
        },
        navigation: {
          navigate,
          goBack,
        },
      };
      render(
        <CommunityChannelScreen
          {...(props as unknown as CommunityChannelProps)}
        />
      );
      await waitFor(() => {
        expect(communityServices.getCommunity).toBeCalledWith(community.id);
      });
      await waitFor(() => {
        expect(messagesServices.listChannelMessages).toBeCalledWith(
          props.route.params.channelId,
          {
            page: 1,
          }
        );
      });
      expect(screen.getAllByTestId("message")).toHaveLength(
        response.meta.pageCount / 2
      );
    });
    it.todo("should use socket io to communicate");
  });
});
