import type { TaskRepository } from "../repositories/contracts/TaskRepository";
import type { Task } from "../types/task";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  getTasks(userId: string): Promise<Task[]> {
    return this.repository.findAll(userId);
  }

  async completeTask(userId: string, taskId: string): Promise<void> {
    const task = await this.repository.findById(userId, taskId);

    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }

    if (task.status === "completed") {
      return;
    }

    await this.repository.update(userId, taskId, {
      status: "completed",
      completedAt: new Date(),
      updatedAt: new Date(),
      xpGranted: true,
    });
  }
}
