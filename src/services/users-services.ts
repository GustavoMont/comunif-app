import api from "@src/config/axios";
import { User } from "@src/models/User";
import { ImageFile } from "@src/types/RN";

export const getUser = async (id: number) => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

export type UpdateUser = Omit<User, "email" | "avatar" | "id">;

export const updateUser = async (id: number, body: UpdateUser) => {
  const { data: user } = await api.patch<User>(`/users/${id}`, body);
  return user;
};

export const updateAvatar = async (id: number, avatar: ImageFile) => {
  const formData = new FormData();
  formData.append("avatar", {
    uri: avatar.uri,
    name: avatar.name,
    type: avatar.type,
  } as any);
  const { data: user } = await api.patch<User>(
    `/users/${id}/avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return user;
};
