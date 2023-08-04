import React from "react";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { Home } from "../Home";
import { HomeScreenProps } from "@src/types/navigation/protectedRoutes";
import { useAuth } from "@src/hooks/useAuth";
import { userGenarator } from "@src/utils/generators";
import { listCommunities } from "@src/services/communities-services";

jest.mock("@src/hooks/useAuth", () => ({ useAuth: jest.fn() }));
jest.mock("@src/services/communities-services", () => ({
  listCommunities: jest.fn(),
}));

const user = userGenarator({ name: "Usuário" });
const navigate = jest.fn();

const props = {
  navigation: {
    navigate,
  },
};

describe("Home screen", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user,
    });
  });
  describe("New user", () => {
    beforeEach(() => {
      (listCommunities as jest.Mock).mockResolvedValue([]);
    });
    it("should have all content", async () => {
      render(<Home {...({} as HomeScreenProps)} />);
      await waitFor(() => {
        expect(listCommunities).toBeCalled();
      });
      expect(screen.getByText(`Bem vindo(a), ${user.name}`)).toBeOnTheScreen();
      expect(screen.getByTestId("profile-button")).toBeOnTheScreen();
      expect(
        screen.getByText(/Você não está em nenhuma comunidade/i)
      ).toBeOnTheScreen();
      expect(
        screen.getByRole("button", { name: /Buscar comunidades/i })
      ).toBeOnTheScreen();
    });
    it("should redirect to correct screens", () => {
      render(<Home {...(props as unknown as HomeScreenProps)} />);
      const communityButton = screen.getByRole("button", {
        name: /Buscar comunidades/i,
      });
      fireEvent.press(communityButton);
      expect(navigate).toBeCalledWith("AllCommunities");
      const profileButton = screen.getByTestId("profile-button");
      fireEvent.press(profileButton);
      expect(navigate).toBeCalledWith("Profile");
    });
  });
  describe("Regular user", () => {
    it.todo("should have all content");
    it.todo("should redirect to more communities");
    it.todo("should redirect to community chat");
  });
});
