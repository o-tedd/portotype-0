import type { Task, TaskStatus } from "../../types/task";
import {
  formatTaskDate,
  getTaskVisualStatus,
  taskDifficultyLabels,
  taskPriorityLabels,
} from "../../utils/task";

interface TaskCardProps {
  task: Task;
  disabled?: boolean;
  onEdit(task: Task): void;
  onDelete(task: Task): void;
  onStatusChange(task: Task, status: TaskStatus): void;
}

export function TaskCard({
  task,
  disabled = false,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const visualStatus = getTaskVisualStatus(task);

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                "rounded-full border px-2.5 py-1 text-xs font-medium",
                visualStatus.className,
              ].join(" ")}
            >
              {visualStatus.label}
            </span>
            <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">
              {taskPriorityLabels[task.priority]}
            </span>
          </div>

          <h3 className="mt-3 break-words text-lg font-semibold">
            {task.title}
          </h3>

          {task.description ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-400">
              {task.description}
            </p>
          ) : null}
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-sky-300">
            {task.xpReward} XP
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {taskDifficultyLabels[task.difficulty]}
          </p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <dt className="text-xs text-slate-500">Prazo</dt>
          <dd className="mt-1 text-slate-300">
            {formatTaskDate(task.dueDate)}
          </dd>
        </div>

        <div>
          <dt className="text-xs text-slate-500">Duração estimada</dt>
          <dd className="mt-1 text-slate-300">
            {task.estimatedDurationMinutes
              ? `${task.estimatedDurationMinutes} min`
              : "Não informada"}
          </dd>
        </div>

        <div>
          <dt className="text-xs text-slate-500">Criada em</dt>
          <dd className="mt-1 text-slate-300">
            {formatTaskDate(task.createdAt)}
          </dd>
        </div>
      </dl>

      {task.notes ? (
        <div className="mt-4 rounded-xl bg-slate-950/70 p-3">
          <p className="text-xs font-medium text-slate-500">Observações</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-300">
            {task.notes}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {task.status === "planned" ? (
          <button
            className="rounded-lg border border-sky-800 px-3 py-2 text-sm text-sky-300 hover:bg-sky-950/50 disabled:opacity-50"
            type="button"
            disabled={disabled}
            onClick={() => onStatusChange(task, "in_progress")}
          >
            Marcar em andamento
          </button>
        ) : null}

        {task.status !== "completed" &&
        task.status !== "cancelled" ? (
          <button
            className="rounded-lg border border-emerald-800 px-3 py-2 text-sm text-emerald-300 hover:bg-emerald-950/50 disabled:opacity-50"
            type="button"
            disabled={disabled}
            onClick={() => onStatusChange(task, "completed")}
          >
            Concluir
          </button>
        ) : null}

        {task.status === "completed" ? (
          <button
            className="rounded-lg border border-amber-800 px-3 py-2 text-sm text-amber-300 hover:bg-amber-950/40 disabled:opacity-50"
            type="button"
            disabled={disabled}
            onClick={() => onStatusChange(task, "planned")}
          >
            Reabrir
          </button>
        ) : null}

        {task.externalUrl ? (
          <a
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            href={task.externalUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Abrir link
          </a>
        ) : null}

        <button
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50"
          type="button"
          disabled={disabled}
          onClick={() => onEdit(task)}
        >
          Editar
        </button>

        <button
          className="rounded-lg border border-red-900 px-3 py-2 text-sm text-red-300 hover:bg-red-950/40 disabled:opacity-50"
          type="button"
          disabled={disabled}
          onClick={() => onDelete(task)}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
