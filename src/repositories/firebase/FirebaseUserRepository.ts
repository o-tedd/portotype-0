import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
  type Firestore,
} from "firebase/firestore";
import type { UserRepository } from "../contracts/UserRepository";
import type { UserProfile } from "../../types/auth";

interface FirebaseUserProfile {
  email: string | null;
  name: string;
  photoUrl?: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalStudySeconds: number;
  completedTasks: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

function toFirestoreProfile(profile: UserProfile): FirebaseUserProfile {
  return {
    email: profile.email,
    name: profile.name,
    photoUrl: profile.photoUrl,
    xp: profile.xp,
    level: profile.level,
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    totalStudySeconds: profile.totalStudySeconds,
    completedTasks: profile.completedTasks,
    createdAt: Timestamp.fromDate(profile.createdAt),
    updatedAt: Timestamp.fromDate(profile.updatedAt),
  };
}

function fromFirestoreProfile(
  id: string,
  data: FirebaseUserProfile,
): UserProfile {
  return {
    id,
    email: data.email,
    name: data.name,
    photoUrl: data.photoUrl,
    xp: data.xp,
    level: data.level,
    currentStreak: data.currentStreak,
    longestStreak: data.longestStreak,
    totalStudySeconds: data.totalStudySeconds,
    completedTasks: data.completedTasks,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
}

export class FirebaseUserRepository implements UserRepository {
  constructor(private readonly db: Firestore) {}

  async findById(userId: string): Promise<UserProfile | null> {
    const snapshot = await getDoc(doc(this.db, "users", userId));

    if (!snapshot.exists()) {
      return null;
    }

    return fromFirestoreProfile(
      snapshot.id,
      snapshot.data() as FirebaseUserProfile,
    );
  }

  async create(profile: UserProfile): Promise<void> {
    await setDoc(
      doc(this.db, "users", profile.id),
      toFirestoreProfile(profile),
    );
  }

  async update(
    userId: string,
    data: Partial<UserProfile>,
  ): Promise<void> {
    const firestoreData: Record<string, unknown> = { ...data };

    delete firestoreData.id;

    if (data.createdAt) {
      firestoreData.createdAt = Timestamp.fromDate(data.createdAt);
    }

    if (data.updatedAt) {
      firestoreData.updatedAt = Timestamp.fromDate(data.updatedAt);
    }

    await updateDoc(doc(this.db, "users", userId), firestoreData);
  }
}
