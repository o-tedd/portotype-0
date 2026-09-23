import {
  addDays,
  addMonths,
  formatDayTitle,
  formatMonthTitle,
  formatWeekTitle,
} from "../../utils/date";

export type PlannerViewMode = "day" | "week" | "month";

interface PlannerToolbarProps {
  view: PlannerViewMode;
  selectedDate: Date;
  onViewChange(view: PlannerViewMode): void;
  onDateChange(date: Date): void;
}

const views: Array<{ value: PlannerViewMode; label: string }> = [
  { value: "day", label: "Dia" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
];

function moveDate(
  date: Date,
  view: PlannerViewMode,
  direction: -1 | 1,
): Date {
  if (view === "day") {
    return addDays(date, direction);
  }

  if (view === "week") {
    return addDays(date, 7 * direction);
  }

  return addMonths(date, direction);
}

function getTitle(date: Date, view: PlannerViewMode): string {
  if (view === "day") {
    return formatDayTitle(date);
  }

  if (view === "week") {
    return formatWeekTitle(date);
  }

  return formatMonthTitle(date);
}

export function PlannerToolbar({
  view,
  selectedDate,
  onViewChange,
  onDateChange,
}: PlannerToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {views.map((item) => (
            <button
              key={item.value}
              className={[
                "rounded-lg border px-4 py-2 text-sm transition",
                view === item.value
                  ? "border-sky-700 bg-sky-950/50 text-sky-300"
                  : "border-slate-700 text-slate-400 hover:bg-slate-800",
              ].join(" ")}
              type="button"
              onClick={() => onViewChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            type="button"
            onClick={() =>
              onDateChange(moveDate(selectedDate, view, -1))
            }
            aria-label="Período anterior"
          >
            ←
          </button>

          <button
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            type="button"
            onClick={() => onDateChange(new Date())}
          >
            Hoje
          </button>

          <button
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            type="button"
            onClick={() =>
              onDateChange(moveDate(selectedDate, view, 1))
            }
            aria-label="Próximo período"
          >
            →
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium capitalize text-slate-200">
        {getTitle(selectedDate, view)}
      </p>
    </div>
  );
}
