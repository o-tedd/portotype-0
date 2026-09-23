import { createContext } from "react";
import type {
  AuthUser,
  LoginInput,
  RegisterInput,
  UserProfile,
} from "../types/auth";

export interface AuthContextValue {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login(input: LoginInput): Promise<void>;
  register(input: RegisterInput): Promise<void>;
  logout(): Promise<void>;
  sendPasswordReset(email: string): Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
