import api from "@src/config/axios";
import { ListResponse } from "@src/models/ApiResponse";
import { Message } from "@src/models/Message";

interface Filters {
  page?: number;
  take?: number;
}

export const listChannelMessages = async (
  channelId: number,
  filters: Filters
) => {
  const { data } = await api.get<ListResponse<Message>>(
    `/messages/channel/${channelId}`,
    { params: filters }
  );
  return data;
};
