import React from "react";
import { useAuth } from "@src/hooks/useAuth";
import { fireEvent, render, screen, waitFor } from "@src/test-utils";
import { imageFileGenerator, userGenarator } from "@src/utils/generators";
import { EditProfileScreen } from "../EditProfileScreen";
import { EditProfileScreenProps } from "@src/types/navigation/protectedRoutes";
import * as usersServices from "@services/users-services";
import { usePermissions } from "@src/hooks/usePermissions";
import * as ImagePicker from "expo-image-picker";

jest.mock("@hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@hooks/usePermissions", () => ({
  usePermissions: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { Images: "Images" },
}));

jest.mock("@services/users-services", () => ({
  updateUser: jest.fn(),
  updateAvatar: jest.fn(),
}));

const user = userGenarator({ id: 200, bio: "esta é minha bio" });

const navigate = jest.fn();

const props = {
  navigation: {
    navigate,
  },
};

const updateUser = jest.fn();

const hasGalleryCameraPermission = jest.fn();

describe("EditProfile Screen", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user,
      updateUser,
    });
    (usePermissions as jest.Mock).mockReturnValue({
      hasGalleryCameraPermission,
    });
  });
  it("should render all content", async () => {
    render(
      <EditProfileScreen {...(props as unknown as EditProfileScreenProps)} />
    );
    expect(screen.getByRole("button", { name: /Cancelar/ })).toBeOnTheScreen();
    expect(screen.getByText(/Editar perfil/i)).toBeOnTheScreen();
    expect(screen.getByRole("button", { name: /Salvar/ })).toBeOnTheScreen();
    expect(screen.getByDisplayValue(user.name)).toBeOnTheScreen();
    expect(screen.getByDisplayValue(user.lastName)).toBeOnTheScreen();
    expect(screen.getByDisplayValue(user.username)).toBeOnTheScreen();
    expect(screen.getByText(/Bio/)).toBeOnTheScreen();
    expect(screen.getByDisplayValue(user.bio ?? "")).toBeOnTheScreen();
  });
  it("should should back to profile screen", () => {
    render(
      <EditProfileScreen {...(props as unknown as EditProfileScreenProps)} />
    );
    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    fireEvent.press(cancelButton);
    expect(navigate).toBeCalledWith("Profile", { userId: user.id });
  });
  it("should update profile", async () => {
    render(
      <EditProfileScreen {...(props as unknown as EditProfileScreenProps)} />
    );
    const newUser = userGenarator();
    jest.spyOn(usersServices, "updateUser").mockResolvedValue(newUser);
    const nameInput = screen.getByDisplayValue(user.name);
    const newName = "Novo";
    fireEvent.changeText(nameInput, newName);
    const lastNameInput = screen.getByDisplayValue(user.lastName);
    const newLastName = "Sobrenome";
    fireEvent.changeText(lastNameInput, newLastName);
    const usernameInput = screen.getByDisplayValue(user.username);
    const newUsername = "new_username";
    fireEvent.changeText(usernameInput, newUsername);
    const bioInput = screen.getByDisplayValue(user.bio ?? "");
    const newBio = "está é minha nova bio";
    fireEvent.changeText(bioInput, newBio);
    fireEvent.press(screen.getByRole("button", { name: /Salvar/i }));
    await waitFor(() => {
      expect(usersServices.updateUser).toBeCalledWith(user.id, {
        name: newName,
        lastName: newLastName,
        bio: newBio,
        username: newUsername,
      });
    });
    expect(updateUser).toBeCalledWith(newUser);
  });
  it("should update avatar", async () => {
    const imageFile = imageFileGenerator({ type: "image/png" });

    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockResolvedValue({
      assets: [
        {
          height: 100,
          width: 100,
          assetId: "",
          base64: null,
          duration: null,
          exif: null,
          fileName: imageFile.name,
          fileSize: 200,
          uri: imageFile.uri,
          type: "image",
        },
      ],
      canceled: false,
    });
    (hasGalleryCameraPermission as jest.Mock).mockResolvedValue(true);
    render(
      <EditProfileScreen {...(props as unknown as EditProfileScreenProps)} />
    );
    const editAvatarButton = screen.getByLabelText(/Editar avatar/);
    expect(editAvatarButton).toBeOnTheScreen();
    fireEvent.press(editAvatarButton);
    await waitFor(() => {
      expect(hasGalleryCameraPermission).toBeCalled();
      expect(ImagePicker.launchImageLibraryAsync).toBeCalled();
    });

    fireEvent.press(screen.getByRole("button", { name: /Salvar/ }));
    await waitFor(() => {
      expect(usersServices.updateAvatar).toBeCalledWith(user.id, imageFile);
    });
  });
});
usersServices;
