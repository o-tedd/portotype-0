import type { Task } from "../../types/task";
import { formatTime } from "../../utils/date";
import { getTaskVisualStatus } from "../../utils/task";

interface PlannerTaskItemProps {
  task: Task;
  onSelect(task: Task): void;
}

export function PlannerTaskItem({
  task,
  onSelect,
}: PlannerTaskItemProps) {
  const visualStatus = getTaskVisualStatus(task);

  return (
    <button
      className="w-full rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-left transition hover:border-slate-700 hover:bg-slate-950"
      type="button"
      onClick={() => onSelect(task)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-200">
            {task.title}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {task.scheduledAt
              ? formatTime(task.scheduledAt)
              : "Sem horário"}
          </p>
        </div>

        <span
          className={[
            "shrink-0 rounded-full border px-2 py-1 text-[10px]",
            visualStatus.className,
          ].join(" ")}
        >
          {visualStatus.label}
        </span>
      </div>
    </button>
  );
}
