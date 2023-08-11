import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import {
  arrayGenerator,
  communityChannelGenerator,
  communityGenerator,
} from "@src/utils/generators";
import { CommunityScreen } from "../CommunityScreen";
import { CommunityScreenProps } from "@src/types/navigation/protectedRoutes";
import { getCommunity } from "@services/communities-services";
import { CommunityChannel } from "@src/models/CommunityChannel";

const community = communityGenerator({
  isMember: true,
  name: "Nome da comunidade",
  communityChannels: arrayGenerator<CommunityChannel>(
    4,
    communityChannelGenerator
  ),
});

jest.mock("@services/communities-services", () => ({
  getCommunity: jest.fn(),
}));

describe("Community Screen", () => {
  describe("Error on get community", () => {
    beforeEach(() => {
      (getCommunity as jest.Mock).mockRejectedValueOnce({});
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should show an error message", async () => {
      const props = {
        route: {
          params: { id: community.id },
        },
      };
      render(
        <CommunityScreen {...(props as unknown as CommunityScreenProps)} />
      );
      await waitFor(() => {
        expect(getCommunity).toBeCalledWith(community.id);
      });
      await waitFor(
        () => {
          expect(screen.queryByLabelText("Carregando")).not.toBeOnTheScreen();
        },
        { timeout: 3 * 1000 }
      );
      expect(
        await screen.findByText(/Comunidade não encontrada/i)
      ).toBeOnTheScreen();
    });
  });
  describe("Is member community", () => {
    beforeEach(() => {
      (getCommunity as jest.Mock).mockResolvedValue(community);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should have content", async () => {
      const props = {
        route: {
          params: { id: community.id },
        },
        navigation: {},
      };
      render(
        <CommunityScreen {...(props as unknown as CommunityScreenProps)} />
      );
      await waitFor(() => {
        expect(getCommunity).toBeCalledWith(community.id);
      });
      expect(await screen.findByText(/Nome da comunidade/i)).toBeOnTheScreen();
      expect(screen.getByLabelText(/Voltar/i)).toBeOnTheScreen();
      expect(
        screen.getByText(`Assunto: ${community.subject}`)
      ).toBeOnTheScreen();
      expect(screen.getByText(/Chats/i)).toBeOnTheScreen();
      expect(screen.getAllByTestId("channel-item")).toHaveLength(
        community.communityChannels.length
      );
    });
    it("should redirect to correct screens", async () => {
      const navigate = jest.fn();
      const goBack = jest.fn();
      const props = {
        route: {
          params: { id: community.id },
        },
        navigation: {
          navigate,
          goBack,
        },
      };
      render(
        <CommunityScreen {...(props as unknown as CommunityScreenProps)} />
      );
      await waitFor(() => {
        expect(getCommunity).toBeCalledWith(community.id);
      });
      fireEvent.press(screen.getByLabelText(/Voltar/i));
      expect(goBack).toBeCalled();
      const [firstChannel] = screen.getAllByTestId("channel-item");
      fireEvent.press(firstChannel);
      expect(navigate).toBeCalledWith("CommunityChannel", {
        communityId: community.id,
        channelId: community.communityChannels[0].id,
      });
    });
  });
  describe("Is not a member", () => {
    beforeEach(() => {
      (getCommunity as jest.Mock).mockResolvedValue(
        communityGenerator({
          isMember: false,
        })
      );
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should redirect to all communities", async () => {
      const navigate = jest.fn();
      const props = {
        route: {
          params: { id: community.id },
        },
        navigation: {
          navigate,
        },
      };
      render(
        <CommunityScreen {...(props as unknown as CommunityScreenProps)} />
      );
      await waitFor(() => {
        expect(getCommunity).toBeCalledWith(community.id);
      });
      await waitFor(() => {
        expect(navigate).toBeCalledWith("AllCommunities");
      });
    });
  });
});
