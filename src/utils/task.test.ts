import { describe, expect, it } from "vitest";
import type { Task } from "../types/task";
import { getTaskVisualStatus, isTaskOverdue } from "./task";

function createTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "task-1",
    userId: "user-1",
    title: "Estudar TypeScript",
    priority: "medium",
    difficulty: "medium",
    status: "planned",
    createdAt: new Date(2026, 8, 20),
    updatedAt: new Date(2026, 8, 20),
    xpReward: 50,
    xpGranted: false,
    ...overrides,
  };
}

describe("task utils", () => {
  const now = new Date(2026, 8, 23, 12, 0);

  it("marks an active task as overdue when its due date has passed", () => {
    const task = createTask({
      dueDate: new Date(2026, 8, 23, 11, 59),
    });

    expect(isTaskOverdue(task, now)).toBe(true);
  });

  it("does not mark completed tasks as overdue", () => {
    const task = createTask({
      status: "completed",
      dueDate: new Date(2026, 8, 22),
    });

    expect(isTaskOverdue(task, now)).toBe(false);
  });

  it("does not use scheduledAt to calculate overdue state", () => {
    const task = createTask({
      scheduledAt: new Date(2026, 8, 20),
      dueDate: new Date(2026, 8, 25),
    });

    expect(isTaskOverdue(task, now)).toBe(false);
  });

  it("returns a red visual state for overdue tasks", () => {
    const task = createTask({
      dueDate: new Date(2026, 8, 22),
    });

    const visual = getTaskVisualStatus(task);

    expect(visual.label).toBe("Atrasada");
    expect(visual.className).toContain("red");
  });

  it("prioritizes completed status over overdue styling", () => {
    const task = createTask({
      status: "completed",
      dueDate: new Date(2026, 8, 22),
    });

    expect(getTaskVisualStatus(task).label).toBe("Concluída");
  });
});
