import type {
  Task,
  TaskDifficulty,
  TaskPriority,
  TaskStatus,
} from "../types/task";

export const taskStatusLabels: Record<TaskStatus, string> = {
  planned: "Planejada",
  in_progress: "Em andamento",
  completed: "Concluída",
  cancelled: "Cancelada",
};

export const taskPriorityLabels: Record<TaskPriority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export const taskDifficultyLabels: Record<TaskDifficulty, string> = {
  easy: "Fácil",
  medium: "Média",
  hard: "Difícil",
};

export function isTaskOverdue(task: Task, now = new Date()): boolean {
  return Boolean(
    task.dueDate &&
      task.status !== "completed" &&
      task.status !== "cancelled" &&
      task.dueDate.getTime() < now.getTime(),
  );
}

export function getTaskVisualStatus(task: Task): {
  label: string;
  className: string;
} {
  if (task.status === "completed") {
    return {
      label: taskStatusLabels.completed,
      className:
        "border-emerald-800 bg-emerald-950/50 text-emerald-300",
    };
  }

  if (isTaskOverdue(task)) {
    return {
      label: "Atrasada",
      className: "border-red-800 bg-red-950/50 text-red-300",
    };
  }

  if (task.status === "in_progress") {
    return {
      label: taskStatusLabels.in_progress,
      className: "border-sky-800 bg-sky-950/50 text-sky-300",
    };
  }

  if (task.status === "cancelled") {
    return {
      label: taskStatusLabels.cancelled,
      className: "border-slate-700 bg-slate-800 text-slate-300",
    };
  }

  return {
    label: taskStatusLabels.planned,
    className: "border-amber-800 bg-amber-950/40 text-amber-300",
  };
}

export function formatTaskDate(date?: Date): string {
  if (!date) {
    return "Sem prazo";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
