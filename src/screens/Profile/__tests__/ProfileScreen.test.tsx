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
    describe("current user", () => {
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
      it("current user without bio", async () => {
        jest.spyOn(usersServices, "getUser").mockResolvedValue({
          ...user,
          bio: undefined,
        });
        render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
        await waitFor(() => {
          expect(usersServices.getUser).toBeCalledWith(1);
        });
        expect(await screen.findByText(/Adicione uma bio ao seu perfil/i));
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
    });
    describe("visiting profile", () => {
      beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
          user: userGenarator({ id: 2 }),
        });
      });
      it("should not show logout and edit profile", async () => {
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
      it("user without bio", async () => {
        jest.spyOn(usersServices, "getUser").mockResolvedValue({
          ...user,
          bio: undefined,
        });
        render(<ProfileScreen {...(props as unknown as ProfileScreenProps)} />);
        await waitFor(() => {
          expect(usersServices.getUser).toHaveBeenCalledWith(1);
        });
        expect(
          await screen.findByText(/Usuário misterioso, não adicionou bio/g)
        ).toBeOnTheScreen();
      });
    });
  });
});
