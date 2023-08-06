import api from "@src/config/axios";
import { Community } from "@src/models/Community";

export const listCommunities = async () => {
  const { data: communities } = await api.get<Community[]>(`/communities`);
  return communities;
};

export const listUserCommunities = async (userId: number) => {
  const { data: communities } = await api.get<Community[]>(
    `/communities/users/${userId}`
  );
  return communities;
};
