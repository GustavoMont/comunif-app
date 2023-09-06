import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { ProfileScreen } from "../ProfileScreen";
import React from "react";
import { ProfileScreenProps } from "@src/types/navigation/protectedRoutes";
import * as usersServices from "@services/users-services";
import * as communitiesServices from "@services/communities-services";
import {
  arrayGenerator,
  communityGenerator,
  userGenarator,
} from "@src/utils/generators";
import { useAuth } from "@src/hooks/useAuth";

jest.mock("@services/users-services", () => ({
  getUser: jest.fn(),
}));
jest.mock("@services/communities-services", () => ({
  listUserCommunities: jest.fn(),
}));

jest.mock("@hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

const route = {
  params: {
    userId: 1,
  },
};
const navigation = {
  navigate: jest.fn(),
};

describe("Profile Screen", () => {
  const props = {
    navigation,
    route,
  };
  describe("User not found", () => {
    beforeEach(() => {
      jest.spyOn(usersServices, "getUser").mockRejectedValue({});
      (useAuth as jest.Mock).mockReturnValue({
        user: userGenarator(),
        logout: jest.fn(),
      });
    });
    it("should render error screen", async () => {
      render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
      await waitFor(() => {
        expect(usersServices.getUser).toBeCalledWith(1);
      });
      expect(
        await screen.findByText(/Usuário não encontrado/i)
      ).toBeOnTheScreen();
      expect(screen.getByLabelText(/Voltar/)).toBeOnTheScreen();
      await waitFor(() => {
        expect(communitiesServices.listUserCommunities).not.toBeCalled();
      });
    });
  });
  describe("user was found", () => {
    const user = userGenarator({
      name: "usuário",
      username: "username",
      lastName: "silva",
      bio: "Seja bem vindo, esta é minha bio.",
    });
    const communities = arrayGenerator(2, communityGenerator);
    const logout = jest.fn();
    beforeEach(() => {
      jest.spyOn(usersServices, "getUser").mockResolvedValue(user);
      jest
        .spyOn(communitiesServices, "listUserCommunities")
        .mockResolvedValue(communities);
      (useAuth as jest.Mock).mockReturnValue({
        logout,
        user,
      });
    });
    it("should have all content", async () => {
      render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
      await waitFor(() => {
        expect(usersServices.getUser).toBeCalledWith(1);
      });
      expect(
        await screen.findByText(
          new RegExp(`${user.name} ${user.lastName}`, "i")
        )
      ).toBeOnTheScreen();
      expect(screen.getByLabelText(/Voltar/)).toBeOnTheScreen();
      expect(
        screen.getByText(new RegExp(`@${user.username}`, "i"))
      ).toBeOnTheScreen();
      expect(screen.getByText(/Bio/)).toBeOnTheScreen();
      expect(
        screen.getByText(new RegExp(`${user.bio}`, "i"))
      ).toBeOnTheScreen();
      expect(screen.getByText(/Comunidades/)).toBeOnTheScreen();
      const [community1] = communities;
      await waitFor(() => {
        expect(communitiesServices.listUserCommunities).toBeCalledWith(1);
      });
      expect(await screen.findAllByText(community1.name)).toHaveLength(2);
      expect(
        screen.getByText(
          new RegExp(`Membro de ${communities.length} comunidades`)
        )
      ).toBeOnTheScreen();
    });
    it("should logout user", async () => {
      render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
      await waitFor(() => {
        expect(usersServices.getUser).toBeCalledWith(1);
      });
      const logoutButton = await screen.findByRole("button", {
        name: /Sair/i,
      });
      expect(logoutButton).toBeOnTheScreen();
      fireEvent.press(logoutButton);
      expect(logout).toBeCalled();
    });
    it("should redirect to edit profile screen", async () => {
      render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
      await waitFor(() => {
        expect(usersServices.getUser).toBeCalledWith(1);
      });
      const editButton = await screen.findByLabelText(/Editar perfil/i);
      expect(editButton).toBeOnTheScreen();
      fireEvent.press(editButton);
      expect(navigation.navigate).toBeCalledWith("EditProfile");
    });
    it("should not show logout and edit profile", async () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: userGenarator({ id: 2 }),
      });
      render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
      await waitFor(() => {
        expect(usersServices.getUser).toHaveBeenCalledWith(1);
      });
      await waitFor(() => {
        expect(
          screen.queryByRole("button", {
            name: /Sair/i,
          })
        ).not.toBeOnTheScreen();
      });
      expect(screen.queryByLabelText(/Editar perfil/i)).not.toBeOnTheScreen();
    });
  });
});
