import { ListResponse } from "@src/models/ApiResponse";
import { ChannelType } from "@src/models/ChannelType";
import { Community } from "@src/models/Community";
import { CommunityChannel } from "@src/models/CommunityChannel";
import { Message } from "@src/models/Message";
import { User } from "@src/models/User";
import { ImageFile } from "@src/types/RN";

type Generator<T> = (costumInfo?: Partial<T>) => T;

type ArrayGenerator = <T>(legnth: number, generator: Generator<T>) => T[];

export const arrayGenerator: ArrayGenerator = <T>(
  length: number,
  generator: Generator<T>
) =>
  Array.from({ length }, (v, i) =>
    generator({
      id: i + 1,
    } as any)
  );

export const listResponseGenerator = <T>(
  length: number,
  generator: Generator<T>,
  response?: Partial<ListResponse<T>>
): ListResponse<T> => ({
  meta: {
    page: 1,
    pageCount: length,
    pages: 1,
    total: length,
  },
  results: arrayGenerator(length, generator),
  ...response,
});

export const userGenarator: Generator<User> = (user) => ({
  email: "email@email.com",
  id: 1,
  lastName: "Sobrenome",
  name: "Nome",
  username: "username",
  ...user,
});

export const communityGenerator: Generator<Community> = (change) => ({
  id: 1,
  name: "comunidade",
  subject: "subject",
  banner: "banner",
  isActive: true,
  isMember: false,
  communityChannels: [],
  ...change,
});

export const communityChannelGenerator: Generator<CommunityChannel> = (
  communityChannel
) => ({
  communityId: 1,
  id: 1,
  channelTypeId: 1,
  channelType: channelTypeGenerator(),
  ...communityChannel,
});

export const channelTypeGenerator: Generator<ChannelType> = (channelType) => ({
  description: "description",
  id: 1,
  name: "other",
  ...channelType,
});

export const messageGenerator: Generator<Message> = (message) => ({
  communityChannel: communityChannelGenerator(),
  communityChannelId: 1,
  content: "mensagem",
  id: 1,
  user: userGenarator(),
  userId: 1,
  ...message,
});

export const imageFileGenerator: Generator<ImageFile> = (imageFile) => ({
  name: "foto.png",
  type: "image/png",
  uri: "file://folder/subfolder/foto.png",
  ...imageFile,
});
