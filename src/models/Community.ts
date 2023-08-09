export interface Community {
  id: number;
  name: string;
  subject: string;
  banner: string | null;
  isActive: boolean;
  isMember: boolean;
}
