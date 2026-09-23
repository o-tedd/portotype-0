import type {
  TaskRepository,
  UpdateTaskRecord,
} from "../repositories/contracts/TaskRepository";
import type {
  Task,
  TaskDifficulty,
  TaskFormInput,
  TaskStatus,
} from "../types/task";

const XP_BY_DIFFICULTY: Record<TaskDifficulty, number> = {
  easy: 25,
  medium: 50,
  hard: 100,
};

function normalizeOptionalText(value?: string): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function validateTaskInput(input: TaskFormInput): void {
  if (input.title.trim().length < 2) {
    throw new Error("O título deve possuir pelo menos 2 caracteres.");
  }

  if (
    input.estimatedDurationMinutes !== undefined &&
    input.estimatedDurationMinutes < 1
  ) {
    throw new Error("A duração estimada deve ser maior que zero.");
  }

  if (input.externalUrl) {
    try {
      const url = new URL(input.externalUrl);
      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error();
      }
    } catch {
      throw new Error("Informe um link externo válido.");
    }
  }
}

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  getTasks(userId: string): Promise<Task[]> {
    return this.repository.findAll(userId);
  }

  getTask(userId: string, taskId: string): Promise<Task | null> {
    return this.repository.findById(userId, taskId);
  }

  async createTask(
    userId: string,
    input: TaskFormInput,
  ): Promise<Task> {
    validateTaskInput(input);

    const now = new Date();

    return this.repository.create({
      userId,
      title: input.title.trim(),
      description: normalizeOptionalText(input.description),
      categoryId: normalizeOptionalText(input.categoryId),
      priority: input.priority,
      difficulty: input.difficulty,
      status: "planned",
      createdAt: now,
      updatedAt: now,
      dueDate: input.dueDate,
      scheduledAt: input.scheduledAt,
      estimatedDurationMinutes: input.estimatedDurationMinutes,
      externalUrl: normalizeOptionalText(input.externalUrl),
      notes: normalizeOptionalText(input.notes),
      xpReward: XP_BY_DIFFICULTY[input.difficulty],
      xpGranted: false,
    });
  }

  async updateTask(
    userId: string,
    taskId: string,
    input: TaskFormInput,
  ): Promise<void> {
    validateTaskInput(input);

    const task = await this.repository.findById(userId, taskId);

    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }

    const data: UpdateTaskRecord = {
      title: input.title.trim(),
      description: normalizeOptionalText(input.description),
      categoryId: normalizeOptionalText(input.categoryId),
      priority: input.priority,
      difficulty: input.difficulty,
      dueDate: input.dueDate,
      scheduledAt: input.scheduledAt,
      estimatedDurationMinutes: input.estimatedDurationMinutes,
      externalUrl: normalizeOptionalText(input.externalUrl),
      notes: normalizeOptionalText(input.notes),
      xpReward: XP_BY_DIFFICULTY[input.difficulty],
      updatedAt: new Date(),
    };

    await this.repository.update(userId, taskId, data);
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    const task = await this.repository.findById(userId, taskId);

    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }

    await this.repository.delete(userId, taskId);
  }

  async setStatus(
    userId: string,
    taskId: string,
    status: TaskStatus,
  ): Promise<void> {
    const task = await this.repository.findById(userId, taskId);

    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }

    await this.repository.update(userId, taskId, {
      status,
      completedAt: status === "completed" ? new Date() : undefined,
      updatedAt: new Date(),
    });
  }

  completeTask(userId: string, taskId: string): Promise<void> {
    return this.setStatus(userId, taskId, "completed");
  }

  reopenTask(userId: string, taskId: string): Promise<void> {
    return this.setStatus(userId, taskId, "planned");
  }

  startTask(userId: string, taskId: string): Promise<void> {
    return this.setStatus(userId, taskId, "in_progress");
  }
}
