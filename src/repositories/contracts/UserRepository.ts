import type { UserProfile } from "../../types/auth";

export interface UserRepository {
  findById(userId: string): Promise<UserProfile | null>;
  create(profile: UserProfile): Promise<void>;
  update(userId: string, data: Partial<UserProfile>): Promise<void>;
}
