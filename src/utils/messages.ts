import { Message } from "@src/models/Model";

export const sortMessages = (m1: Message, m2: Message) =>
  m1.id > m2.id ? 1 : -1;
