import type { StudySession } from "../../types/session";

export type CreateStudySessionInput = Omit<StudySession, "id">;

export interface SessionRepository {
  findByTask(userId: string, taskId: string): Promise<StudySession[]>;
  findActive(userId: string): Promise<StudySession | null>;
  create(session: CreateStudySessionInput): Promise<StudySession>;
  update(userId: string, sessionId: string, data: Partial<StudySession>): Promise<void>;
}
