import type { Task } from "../../types/task";

export type CreateTaskRecord = Omit<Task, "id">;
export type UpdateTaskRecord = Partial<
  Omit<Task, "id" | "userId" | "createdAt">
>;

export interface TaskRepository {
  findAll(userId: string): Promise<Task[]>;
  findById(userId: string, taskId: string): Promise<Task | null>;
  create(task: CreateTaskRecord): Promise<Task>;
  update(
    userId: string,
    taskId: string,
    data: UpdateTaskRecord,
  ): Promise<void>;
  delete(userId: string, taskId: string): Promise<void>;
}
