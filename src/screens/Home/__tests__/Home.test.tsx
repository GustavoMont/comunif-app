import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { Home } from "../Home";
import { HomeScreenProps } from "@src/types/navigation/protectedRoutes";
import { useAuth } from "@src/hooks/useAuth";
import {
  arrayGenerator,
  communityGenerator,
  userGenarator,
} from "@src/utils/generators";
import { listUserCommunities } from "@src/services/communities-services";
import { useNavigation } from "@react-navigation/native";

jest.mock("@src/hooks/useAuth", () => ({ useAuth: jest.fn() }));

jest.mock("@src/services/communities-services", () => ({
  listUserCommunities: jest.fn(),
}));

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

const user = userGenarator({ name: "Usuário" });

describe("Home screen", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user,
    });
    (useNavigation as jest.Mock).mockReturnValue(props.navigation);
  });
  describe("New user", () => {
    beforeEach(() => {
      (listUserCommunities as jest.Mock).mockResolvedValueOnce([]);
    });
    it("should have all content", async () => {
      render(<Home {...({} as HomeScreenProps)} />);
      await waitFor(() => {
        expect(listUserCommunities).toBeCalledWith(1);
      });
      expect(screen.getByText(`Bem vindo(a), ${user.name}`)).toBeOnTheScreen();
      expect(screen.getByTestId("profile-button")).toBeOnTheScreen();
      expect(
        await screen.findByText(/Você não está em nenhuma comunidade/i)
      ).toBeOnTheScreen();
      expect(
        screen.getByRole("button", { name: /Buscar comunidades/i })
      ).toBeOnTheScreen();
    });
    it("should redirect to correct screens", async () => {
      render(<Home {...(props as unknown as HomeScreenProps)} />);
      await waitFor(() => {
        expect(listUserCommunities).toBeCalledWith(1);
      });
      const communityButton = screen.getByRole("button", {
        name: /Buscar comunidades/i,
      });
      fireEvent.press(communityButton);
      expect(props.navigation.navigate).toBeCalledWith("AllCommunities");
      const profileButton = screen.getByTestId("profile-button");
      fireEvent.press(profileButton);
      expect(props.navigation.navigate).toBeCalledWith("Profile", {
        userId: 1,
      });
    });
  });
  describe("Regular user", () => {
    const communities = arrayGenerator(5, communityGenerator);
    beforeEach(() => {
      (listUserCommunities as jest.Mock).mockResolvedValue(communities);
    });
    it("should have all content", async () => {
      render(<Home {...(props as unknown as HomeScreenProps)} />);
      await waitFor(() => {
        expect(listUserCommunities).toBeCalledWith(1);
      });
      expect(screen.getByText(`Bem vindo(a), ${user.name}`)).toBeOnTheScreen();
      expect(screen.getByTestId("profile-button")).toBeOnTheScreen();
      expect(await screen.findByText(/Minhas comunidades:/i)).toBeOnTheScreen();
      expect(await screen.findAllByText("comunidade")).toHaveLength(
        communities.length
      );
      expect(
        screen.getByRole("button", { name: /Mais comunidades/i })
      ).toBeOnTheScreen();
    });
    it("should redirect to more communities", async () => {
      render(<Home {...(props as unknown as HomeScreenProps)} />);
      await waitFor(() => {
        expect(listUserCommunities).toBeCalledWith(1);
      });
      fireEvent.press(
        screen.getByRole("button", { name: /Mais comunidades/i })
      );
      expect(props.navigation.navigate).toBeCalledWith("AllCommunities");
    });
    it("should redirect to community chat", async () => {
      render(<Home {...(props as unknown as HomeScreenProps)} />);
      await waitFor(() => {
        expect(listUserCommunities).toBeCalled();
      });
      const firstCommunity = communities[0];
      const communitiesCards = await screen.findAllByText(firstCommunity.name);
      const firstCommunityCard = communitiesCards[0];
      fireEvent.press(firstCommunityCard);
      expect(props.navigation.navigate).toBeCalledWith("Community", {
        id: firstCommunity.id,
      });
    });
  });
});
