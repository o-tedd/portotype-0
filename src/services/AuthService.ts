import type { AuthRepository } from "../repositories/contracts/AuthRepository";
import type { UserRepository } from "../repositories/contracts/UserRepository";
import type {
  AuthUser,
  LoginInput,
  RegisterInput,
  UserProfile,
} from "../types/auth";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  login(input: LoginInput): Promise<AuthUser> {
    return this.authRepository.login(input);
  }

  register(input: RegisterInput): Promise<AuthUser> {
    return this.authRepository.register(input);
  }

  logout(): Promise<void> {
    return this.authRepository.logout();
  }

  sendPasswordReset(email: string): Promise<void> {
    return this.authRepository.sendPasswordReset(email);
  }

  subscribeToAuthState(listener: (user: AuthUser | null) => void): () => void {
    return this.authRepository.subscribe(listener);
  }

  async getOrCreateProfile(user: AuthUser): Promise<UserProfile> {
    const existingProfile = await this.userRepository.findById(user.id);

    if (existingProfile) {
      return existingProfile;
    }

    const now = new Date();

    const profile: UserProfile = {
      id: user.id,
      email: user.email,
      name: user.displayName?.trim() || user.email?.split("@")[0] || "Usuário",
      photoUrl: user.photoUrl ?? undefined,
      xp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      totalStudySeconds: 0,
      completedTasks: 0,
      createdAt: now,
      updatedAt: now,
    };

    await this.userRepository.create(profile);

    return profile;
  }
}
