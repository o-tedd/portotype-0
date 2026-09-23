export type TaskStatus = "planned" | "in_progress" | "completed" | "cancelled";
export type TaskPriority = "low" | "medium" | "high";
export type TaskDifficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  categoryId?: string;
  priority: TaskPriority;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  scheduledAt?: Date;
  estimatedDurationMinutes?: number;
  externalUrl?: string;
  notes?: string;
  completedAt?: Date;
  xpReward: number;
  xpGranted: boolean;
  certificateId?: string;
}
