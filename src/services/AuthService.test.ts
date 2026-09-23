import { describe, expect, it } from "vitest";
import type {
  AuthRepository,
  AuthStateListener,
} from "../repositories/contracts/AuthRepository";
import type { UserRepository } from "../repositories/contracts/UserRepository";
import type {
  AuthUser,
  LoginInput,
  RegisterInput,
  UserProfile,
} from "../types/auth";
import { AuthService } from "./AuthService";

class FakeAuthRepository implements AuthRepository {
  async login(input: LoginInput): Promise<AuthUser> {
    return {
      id: "user-1",
      email: input.email,
      displayName: null,
      photoUrl: null,
      emailVerified: false,
    };
  }

  async register(input: RegisterInput): Promise<AuthUser> {
    return {
      id: "user-1",
      email: input.email,
      displayName: input.name,
      photoUrl: null,
      emailVerified: false,
    };
  }

  async logout(): Promise<void> {}

  async sendPasswordReset(): Promise<void> {}

  subscribe(_listener: AuthStateListener): () => void {
    return () => {};
  }
}

class FakeUserRepository implements UserRepository {
  profile: UserProfile | null = null;
  created?: UserProfile;

  async findById(): Promise<UserProfile | null> {
    return this.profile;
  }

  async create(profile: UserProfile): Promise<void> {
    this.created = profile;
    this.profile = profile;
  }

  async update(
    _userId: string,
    _data: Partial<UserProfile>,
  ): Promise<void> {}
}

function authUser(
  overrides: Partial<AuthUser> = {},
): AuthUser {
  return {
    id: "user-1",
    email: "patrick@example.com",
    displayName: "Patrick",
    photoUrl: null,
    emailVerified: false,
    ...overrides,
  };
}

describe("AuthService", () => {
  it("returns an existing user profile without recreating it", async () => {
    const users = new FakeUserRepository();
    users.profile = {
      id: "user-1",
      email: "patrick@example.com",
      name: "Patrick",
      xp: 10,
      level: 2,
      currentStreak: 1,
      longestStreak: 3,
      totalStudySeconds: 600,
      completedTasks: 2,
      createdAt: new Date(2026, 8, 20),
      updatedAt: new Date(2026, 8, 20),
    };

    const service = new AuthService(
      new FakeAuthRepository(),
      users,
    );

    const profile = await service.getOrCreateProfile(authUser());

    expect(profile).toBe(users.profile);
    expect(users.created).toBeUndefined();
  });

  it("creates a new profile with safe gamification defaults", async () => {
    const users = new FakeUserRepository();
    const service = new AuthService(
      new FakeAuthRepository(),
      users,
    );

    const profile = await service.getOrCreateProfile(authUser());

    expect(users.created).toBeDefined();
    expect(profile.name).toBe("Patrick");
    expect(profile.xp).toBe(0);
    expect(profile.level).toBe(1);
    expect(profile.currentStreak).toBe(0);
    expect(profile.longestStreak).toBe(0);
    expect(profile.totalStudySeconds).toBe(0);
    expect(profile.completedTasks).toBe(0);
  });

  it("falls back to the email prefix when displayName is missing", async () => {
    const users = new FakeUserRepository();
    const service = new AuthService(
      new FakeAuthRepository(),
      users,
    );

    const profile = await service.getOrCreateProfile(
      authUser({ displayName: null }),
    );

    expect(profile.name).toBe("patrick");
  });
});
