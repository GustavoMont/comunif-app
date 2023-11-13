import { Community } from "./Community";
import { User } from "./User";

export interface EvasionReport {
  id: number;
  userId: number;
  user: User;
  remover: User | null;
  removerId: number | null;
  reason: string | null;
  communityId: number;
  community: Community;
  removedAt: string;
}
