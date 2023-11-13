import api from "@src/config/axios";
import { ListResponse } from "@src/models/ApiResponse";
import { Community } from "@src/models/Community";

export interface ListCommunitiesFilters {
  name?: string;
}

export const listCommunities = async (filters: ListCommunitiesFilters = {}) => {
  const { data: communities } = await api.get<ListResponse<Community>>(
    `/communities`,
    { params: filters }
  );
  return communities;
};

export const getCommunity = async (communityId: number) => {
  const { data: community } = await api.get<Community>(
    `/communities/${communityId}`
  );
  return community;
};

interface AddUserCommunity {
  communityId: number;
}

export const addUserToCommunity = async (body: AddUserCommunity) => {
  const { data: community } = await api.post<Community>(
    `/community-users`,
    body
  );
  return community;
};

export const listUserCommunities = async (userId: number) => {
  const { data: communities } = await api.get<Community[]>(
    `/communities/users/${userId}`
  );
  return communities;
};

export const leaveCommunity = async (communityId: number, userId: number) => {
  await api.delete(`/community-users/${communityId}/members/${userId}`);
};
