import type { AuthUser, LoginInput, RegisterInput } from "../../types/auth";

export type AuthStateListener = (user: AuthUser | null) => void;

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthUser>;
  register(input: RegisterInput): Promise<AuthUser>;
  logout(): Promise<void>;
  sendPasswordReset(email: string): Promise<void>;
  subscribe(listener: AuthStateListener): () => void;
}
