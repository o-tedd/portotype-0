export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string | null;
  name: string;
  photoUrl?: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalStudySeconds: number;
  completedTasks: number;
  createdAt: Date;
  updatedAt: Date;
}
