export type StudySessionStatus = "active" | "paused" | "completed" | "cancelled";

export interface StudySession {
  id: string;
  userId: string;
  taskId: string;
  startedAt: Date;
  endedAt?: Date;
  pausedAt?: Date;
  pausedDurationSeconds: number;
  durationSeconds: number;
  status: StudySessionStatus;
  xpGranted: number;
  createdAt: Date;
}
