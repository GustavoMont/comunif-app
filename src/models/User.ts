export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  username: string;
}

export interface RegisterPayload {
  name: string;
  lastName: string;
  email: string;
  username: string;
  birthday: Date;
  password: string;
  confirmPassword: string;
}

export interface AuthStorage {
  access: string;
}
