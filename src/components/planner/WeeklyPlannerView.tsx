import type { Task } from "../../types/task";
import {
  formatDayNumber,
  formatShortWeekday,
  getWeekDays,
  isSameDay,
} from "../../utils/date";
import { PlannerTaskItem } from "./PlannerTaskItem";

interface WeeklyPlannerViewProps {
  date: Date;
  tasks: Task[];
  onSelectDate(date: Date): void;
  onSelectTask(task: Task): void;
}

export function WeeklyPlannerView({
  date,
  tasks,
  onSelectDate,
  onSelectTask,
}: WeeklyPlannerViewProps) {
  const days = getWeekDays(date);
  const today = new Date();

  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-[980px] grid-cols-7 gap-3">
        {days.map((day) => {
          const dayTasks = tasks
            .filter(
              (task) =>
                task.scheduledAt &&
                isSameDay(task.scheduledAt, day),
            )
            .sort(
              (left, right) =>
                (left.scheduledAt?.getTime() ?? 0) -
                (right.scheduledAt?.getTime() ?? 0),
            );

          return (
            <section
              key={day.toISOString()}
              className={[
                "min-h-72 rounded-2xl border p-3",
                isSameDay(day, today)
                  ? "border-sky-800 bg-sky-950/20"
                  : "border-slate-800 bg-slate-900",
              ].join(" ")}
            >
              <button
                className="w-full rounded-lg p-2 text-left hover:bg-slate-800"
                type="button"
                onClick={() => onSelectDate(day)}
              >
                <p className="text-xs uppercase text-slate-500">
                  {formatShortWeekday(day)}
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {formatDayNumber(day)}
                </p>
              </button>

              <div className="mt-3 space-y-2">
                {dayTasks.length === 0 ? (
                  <p className="px-2 py-4 text-center text-xs text-slate-600">
                    Sem tarefas
                  </p>
                ) : (
                  dayTasks.map((task) => (
                    <PlannerTaskItem
                      key={task.id}
                      task={task}
                      onSelect={onSelectTask}
                    />
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
