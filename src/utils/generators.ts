import { User } from "@src/models/User";

type generator<T> = (costumInfo: Partial<T>) => T;

export const userGenarator: generator<User> = (user) => ({
  email: "email@email.com",
  id: 1,
  lastName: "Sobrenome",
  name: "Nome",
  username: "username",
  ...user,
});
