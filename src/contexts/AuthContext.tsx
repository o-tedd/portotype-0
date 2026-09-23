import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../config/services";
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

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const unsubscribe = authService.subscribeToAuthState((nextUser) => {
      if (!active) {
        return;
      }

      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      void authService
        .getOrCreateProfile(nextUser)
        .then((nextProfile) => {
          if (active) {
            setProfile(nextProfile);
          }
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    await authService.login(input);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    await authService.register(input);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    await authService.sendPasswordReset(email);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      login,
      register,
      logout,
      sendPasswordReset,
    }),
    [
      user,
      profile,
      loading,
      login,
      register,
      logout,
      sendPasswordReset,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
