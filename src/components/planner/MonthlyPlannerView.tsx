import type { Task } from "../../types/task";
import {
  formatDayNumber,
  formatShortWeekday,
  getMonthGridDays,
  isSameDay,
} from "../../utils/date";
import { getTaskVisualStatus } from "../../utils/task";

interface MonthlyPlannerViewProps {
  date: Date;
  tasks: Task[];
  onSelectDate(date: Date): void;
  onSelectTask(task: Task): void;
}

export function MonthlyPlannerView({
  date,
  tasks,
  onSelectDate,
  onSelectTask,
}: MonthlyPlannerViewProps) {
  const days = getMonthGridDays(date);
  const today = new Date();

  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-7 gap-2 px-1 pb-2">
          {days.slice(0, 7).map((day) => (
            <p
              key={day.toISOString()}
              className="px-2 text-xs font-medium uppercase text-slate-500"
            >
              {formatShortWeekday(day)}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
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

            const outsideMonth = day.getMonth() !== date.getMonth();

            return (
              <section
                key={day.toISOString()}
                className={[
                  "min-h-32 rounded-xl border p-2",
                  outsideMonth
                    ? "border-slate-900 bg-slate-950/50 text-slate-600"
                    : "border-slate-800 bg-slate-900",
                  isSameDay(day, today)
                    ? "ring-1 ring-sky-700"
                    : "",
                ].join(" ")}
              >
                <button
                  className="mb-2 rounded-md px-2 py-1 text-sm font-medium hover:bg-slate-800"
                  type="button"
                  onClick={() => onSelectDate(day)}
                >
                  {formatDayNumber(day)}
                </button>

                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => {
                    const visualStatus = getTaskVisualStatus(task);

                    return (
                      <button
                        key={task.id}
                        className={[
                          "block w-full truncate rounded-md border px-2 py-1 text-left text-xs",
                          visualStatus.className,
                        ].join(" ")}
                        type="button"
                        title={task.title}
                        onClick={() => onSelectTask(task)}
                      >
                        {task.title}
                      </button>
                    );
                  })}

                  {dayTasks.length > 3 ? (
                    <p className="px-2 text-xs text-slate-500">
                      +{dayTasks.length - 3} tarefa(s)
                    </p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
