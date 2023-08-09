import { Community } from "@src/models/Community";
import { User } from "@src/models/User";

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
  ...change,
});
