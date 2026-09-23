import type { Task } from "../../types/task";
import { isSameDay } from "../../utils/date";
import { TaskCard } from "../tasks/TaskCard";

interface DailyPlannerViewProps {
  date: Date;
  tasks: Task[];
  saving: boolean;
  onEdit(task: Task): void;
  onDelete(task: Task): void;
  onStatusChange(task: Task, status: Task["status"]): void;
  onCreateForDate(date: Date): void;
}

export function DailyPlannerView({
  date,
  tasks,
  saving,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateForDate,
}: DailyPlannerViewProps) {
  const dayTasks = tasks
    .filter(
      (task) =>
        task.scheduledAt && isSameDay(task.scheduledAt, date),
    )
    .sort(
      (left, right) =>
        (left.scheduledAt?.getTime() ?? 0) -
        (right.scheduledAt?.getTime() ?? 0),
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          {dayTasks.length} tarefa(s) planejada(s)
        </p>

        <button
          className="rounded-lg border border-sky-800 px-3 py-2 text-sm text-sky-300 hover:bg-sky-950/50"
          type="button"
          onClick={() => onCreateForDate(date)}
        >
          + Planejar neste dia
        </button>
      </div>

      {dayTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <p className="font-medium">Nenhuma tarefa planejada.</p>
          <p className="mt-2 text-sm text-slate-500">
            Use “Planejar neste dia” para adicionar uma atividade.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {dayTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              disabled={saving}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
