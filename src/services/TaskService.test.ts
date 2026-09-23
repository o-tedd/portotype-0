import { describe, expect, it } from "vitest";
import type {
  CreateTaskRecord,
  TaskRepository,
  UpdateTaskRecord,
} from "../repositories/contracts/TaskRepository";
import type { Task, TaskFormInput } from "../types/task";
import { TaskService } from "./TaskService";

class FakeTaskRepository implements TaskRepository {
  tasks = new Map<string, Task>();
  lastCreated?: CreateTaskRecord;
  lastUpdated?: UpdateTaskRecord;
  deletedId?: string;

  async findAll(userId: string): Promise<Task[]> {
    return [...this.tasks.values()].filter(
      (task) => task.userId === userId,
    );
  }

  async findById(
    userId: string,
    taskId: string,
  ): Promise<Task | null> {
    const task = this.tasks.get(taskId);
    return task?.userId === userId ? task : null;
  }

  async create(task: CreateTaskRecord): Promise<Task> {
    this.lastCreated = task;
    const created = { id: "task-created", ...task };
    this.tasks.set(created.id, created);
    return created;
  }

  async update(
    userId: string,
    taskId: string,
    data: UpdateTaskRecord,
  ): Promise<void> {
    const current = await this.findById(userId, taskId);
    if (!current) {
      throw new Error("Tarefa não encontrada.");
    }

    this.lastUpdated = data;

    const next = { ...current, ...data } as Task;
    if (data.completedAt === undefined) {
      delete next.completedAt;
    }

    this.tasks.set(taskId, next);
  }

  async delete(userId: string, taskId: string): Promise<void> {
    const current = await this.findById(userId, taskId);
    if (!current) {
      throw new Error("Tarefa não encontrada.");
    }

    this.deletedId = taskId;
    this.tasks.delete(taskId);
  }
}

const baseInput: TaskFormInput = {
  title: " Estudar React ",
  description: " Revisar hooks ",
  priority: "high",
  difficulty: "easy",
  estimatedDurationMinutes: 60,
  externalUrl: "https://react.dev",
};

function existingTask(): Task {
  return {
    id: "task-1",
    userId: "user-1",
    title: "Tarefa",
    priority: "medium",
    difficulty: "medium",
    status: "planned",
    createdAt: new Date(2026, 8, 20),
    updatedAt: new Date(2026, 8, 20),
    xpReward: 50,
    xpGranted: false,
  };
}

describe("TaskService", () => {
  it("creates tasks with normalized fields and XP by difficulty", async () => {
    const repository = new FakeTaskRepository();
    const service = new TaskService(repository);

    const task = await service.createTask("user-1", baseInput);

    expect(task.title).toBe("Estudar React");
    expect(task.description).toBe("Revisar hooks");
    expect(task.status).toBe("planned");
    expect(task.xpReward).toBe(25);
    expect(task.xpGranted).toBe(false);
  });

  it("rejects titles shorter than two characters", async () => {
    const service = new TaskService(new FakeTaskRepository());

    await expect(
      service.createTask("user-1", {
        ...baseInput,
        title: "a",
      }),
    ).rejects.toThrow("pelo menos 2 caracteres");
  });

  it("rejects invalid external URLs", async () => {
    const service = new TaskService(new FakeTaskRepository());

    await expect(
      service.createTask("user-1", {
        ...baseInput,
        externalUrl: "javascript:alert(1)",
      }),
    ).rejects.toThrow("link externo válido");
  });

  it("completes a task without granting XP", async () => {
    const repository = new FakeTaskRepository();
    repository.tasks.set("task-1", existingTask());
    const service = new TaskService(repository);

    await service.completeTask("user-1", "task-1");

    expect(repository.lastUpdated?.status).toBe("completed");
    expect(repository.lastUpdated?.completedAt).toBeInstanceOf(Date);
    expect(repository.lastUpdated).not.toHaveProperty("xpGranted");
  });

  it("reopens a completed task and clears completedAt", async () => {
    const repository = new FakeTaskRepository();
    repository.tasks.set("task-1", {
      ...existingTask(),
      status: "completed",
      completedAt: new Date(2026, 8, 22),
    });
    const service = new TaskService(repository);

    await service.reopenTask("user-1", "task-1");

    expect(repository.lastUpdated?.status).toBe("planned");
    expect(repository.lastUpdated?.completedAt).toBeUndefined();
  });

  it("deletes only existing tasks", async () => {
    const repository = new FakeTaskRepository();
    repository.tasks.set("task-1", existingTask());
    const service = new TaskService(repository);

    await service.deleteTask("user-1", "task-1");

    expect(repository.deletedId).toBe("task-1");
    expect(repository.tasks.has("task-1")).toBe(false);
  });
});
