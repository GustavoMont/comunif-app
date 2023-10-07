import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { CommunityDrawer } from "../CommunityDrawer";
import React from "react";
import * as communityServices from "@services/communities-services";
import * as userService from "@services/users-services";
import {
  arrayGenerator,
  communityChannelGenerator,
  communityGenerator,
  listResponseGenerator,
  userGenarator,
} from "@src/utils/generators";
import { useAuth } from "@src/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

jest.mock("@services/communities-services", () => ({
  getCommunity: jest.fn(),
  listUserCommunities: jest.fn(),
}));

jest.mock("@services/users-services", () => ({
  listCommunityMembers: jest.fn(),
}));

jest.mock("@src/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

const navigation = {
  navigate: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("Community Drawer", () => {
  describe("On Success", () => {
    const onCloseDrawer = jest.fn();
    const communityId = 1;
    const communityChannels = arrayGenerator(2, communityChannelGenerator);
    const community = communityGenerator({
      name: "Testersons",
      communityChannels,
    });
    const currentUser = userGenarator({ id: 7 });
    const communitiesResponse = listResponseGenerator(5, communityGenerator);
    const usersResponse = listResponseGenerator(5, userGenarator);
    beforeEach(() => {
      jest
        .spyOn(communityServices, "getCommunity")
        .mockResolvedValue(community);
      jest
        .spyOn(userService, "listCommunityMembers")
        .mockResolvedValue(usersResponse);
      jest
        .spyOn(communityServices, "listUserCommunities")
        .mockResolvedValue(communitiesResponse.results);
      (useAuth as jest.Mock).mockReturnValue({
        user: currentUser,
      });
      (useNavigation as jest.Mock).mockReturnValue(navigation);
    });
    it("should show community channel, members and user communities", async () => {
      render(
        <CommunityDrawer
          closeDrawer={onCloseDrawer}
          communityId={communityId}
        />
      );
      await waitFor(() =>
        expect(communityServices.getCommunity).toBeCalledWith(communityId)
      );
      expect(await screen.findByText(community.name)).toBeOnTheScreen();
      expect(screen.getByText(/Chats/)).toBeOnTheScreen();
      const [channel] = communityChannels;
      expect(await screen.findAllByText(channel.channelType.name)).toHaveLength(
        communityChannels.length
      );
      await waitFor(() =>
        expect(userService.listCommunityMembers).toBeCalledWith(communityId)
      );
      expect(screen.getByText(/Membros/gi)).toBeOnTheScreen();
      const [user] = usersResponse.results;

      expect(await screen.findAllByText(new RegExp(user.name))).toHaveLength(
        usersResponse.results.length
      );
      expect(screen.getByText(/Outras comunidades/gi)).toBeOnTheScreen();
      await waitFor(() =>
        expect(communityServices.listUserCommunities).toBeCalledWith(
          currentUser.id
        )
      );
      const [userCommunity] = communitiesResponse.results;
      expect(await screen.findAllByText(userCommunity.name)).toHaveLength(
        communitiesResponse.results.length
      );
    });
    it("should redirect to profile page", async () => {
      render(
        <CommunityDrawer
          closeDrawer={onCloseDrawer}
          communityId={communityId}
        />
      );
      await waitFor(() =>
        expect(communityServices.getCommunity).toBeCalledWith(communityId)
      );
      await waitFor(() =>
        expect(userService.listCommunityMembers).toBeCalledWith(communityId)
      );
      const [user] = usersResponse.results;
      const [button] = await screen.findAllByText(new RegExp(user.name));
      fireEvent.press(button);
      expect(navigation.navigate).toBeCalledWith("Profile", {
        userId: user.id,
      });
    });
    it("should redirect to channel chat", async () => {
      render(
        <CommunityDrawer
          closeDrawer={onCloseDrawer}
          communityId={communityId}
        />
      );
      await waitFor(() =>
        expect(communityServices.getCommunity).toBeCalledWith(communityId)
      );

      const [channel] = communityChannels;
      const [button] = await screen.findAllByTestId("channel-item");
      fireEvent.press(button);
      expect(navigation.navigate).toBeCalledWith("CommunityChannel", {
        channelId: channel.id,
        communityId,
      });
    });
    it("should redirect to community page", async () => {
      render(
        <CommunityDrawer
          closeDrawer={onCloseDrawer}
          communityId={communityId}
        />
      );
      await waitFor(() =>
        expect(communityServices.getCommunity).toBeCalledWith(communityId)
      );
      const [community] = communitiesResponse.results;
      const [button] = await screen.findAllByText(community.name);
      fireEvent.press(button);
      expect(navigation.navigate).toBeCalledWith("Community", {
        id: community.id,
      });
    });
  });
});
