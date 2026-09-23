import type { Task } from "../../types/task";

export type CreateTaskInput = Omit<Task, "id">;

export interface TaskRepository {
  findAll(userId: string): Promise<Task[]>;
  findById(userId: string, taskId: string): Promise<Task | null>;
  create(task: CreateTaskInput): Promise<Task>;
  update(userId: string, taskId: string, data: Partial<Task>): Promise<void>;
  delete(userId: string, taskId: string): Promise<void>;
}
