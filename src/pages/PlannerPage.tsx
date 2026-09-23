import { useMemo, useState } from "react";
import { DailyPlannerView } from "../components/planner/DailyPlannerView";
import { MonthlyPlannerView } from "../components/planner/MonthlyPlannerView";
import {
  PlannerToolbar,
  type PlannerViewMode,
} from "../components/planner/PlannerToolbar";
import { WeeklyPlannerView } from "../components/planner/WeeklyPlannerView";
import { TaskCard } from "../components/tasks/TaskCard";
import { TaskForm } from "../components/tasks/TaskForm";
import { useTasks } from "../hooks/useTasks";
import type {
  Task,
  TaskFormInput,
  TaskStatus,
} from "../types/task";
import { createDefaultScheduledDate } from "../utils/date";
import { isTaskOverdue } from "../utils/task";

type TaskFilter = "all" | TaskStatus | "overdue";

const filters: Array<{ value: TaskFilter; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "planned", label: "Planejadas" },
  { value: "in_progress", label: "Em andamento" },
  { value: "completed", label: "Concluídas" },
  { value: "overdue", label: "Atrasadas" },
];

export function PlannerPage() {
  const {
    tasks,
    loading,
    saving,
    error,
    createTask,
    updateTask,
    deleteTask,
    setStatus,
  } = useTasks();

  const [view, setView] = useState<PlannerViewMode>("day");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultScheduledAt, setDefaultScheduledAt] =
    useState<Date>();

  const statistics = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter(
        (task) =>
          task.status === "planned" ||
          task.status === "in_progress",
      ).length,
      completed: tasks.filter(
        (task) => task.status === "completed",
      ).length,
      overdue: tasks.filter((task) => isTaskOverdue(task)).length,
    }),
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    if (filter === "overdue") {
      return tasks.filter((task) => isTaskOverdue(task));
    }

    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  const unscheduledTasks = useMemo(
    () => filteredTasks.filter((task) => !task.scheduledAt),
    [filteredTasks],
  );

  function openCreateForm() {
    setEditingTask(null);
    setDefaultScheduledAt(undefined);
    setFormOpen(true);
  }

  function openCreateForDate(date: Date) {
    setEditingTask(null);
    setSelectedDate(date);
    setDefaultScheduledAt(createDefaultScheduledDate(date));
    setFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setDefaultScheduledAt(undefined);
    setFormOpen(true);
  }

  function closeForm() {
    setEditingTask(null);
    setDefaultScheduledAt(undefined);
    setFormOpen(false);
  }

  function selectCalendarDate(date: Date) {
    setSelectedDate(date);
    setView("day");
  }

  async function handleSubmit(input: TaskFormInput) {
    if (editingTask) {
      await updateTask(editingTask.id, input);
    } else {
      await createTask(input);
    }

    closeForm();
  }

  async function handleStatusChange(
    task: Task,
    status: TaskStatus,
  ) {
    try {
      await setStatus(task.id, status);
    } catch {
      // O erro é exibido no feedback geral do Planner.
    }
  }

  async function handleDelete(task: Task) {
    const confirmed = window.confirm(
      `Excluir a tarefa "${task.title}"? Esta ação não pode ser desfeita.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(task.id);

      if (editingTask?.id === task.id) {
        closeForm();
      }
    } catch {
      // O erro é exibido no feedback geral do Planner.
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Organização</p>
          <h2 className="text-3xl font-bold">Planner</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Navegue por dia, semana ou mês. A data planejada organiza a
            agenda; o prazo continua sendo a data limite da atividade.
          </p>
        </div>

        <button
          className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          type="button"
          onClick={openCreateForm}
        >
          Nova tarefa
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Total</p>
          <p className="mt-1 text-2xl font-semibold">{statistics.total}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Ativas</p>
          <p className="mt-1 text-2xl font-semibold">{statistics.active}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Concluídas</p>
          <p className="mt-1 text-2xl font-semibold">
            {statistics.completed}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Atrasadas</p>
          <p className="mt-1 text-2xl font-semibold">
            {statistics.overdue}
          </p>
        </article>
      </div>

      {formOpen ? (
        <TaskForm
          key={
            editingTask?.id ??
            defaultScheduledAt?.getTime().toString() ??
            "new-task"
          }
          task={editingTask}
          defaultScheduledAt={defaultScheduledAt}
          submitting={saving}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      ) : null}

      {error ? (
        <div
          className="rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-300"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <PlannerToolbar
        view={view}
        selectedDate={selectedDate}
        onViewChange={setView}
        onDateChange={setSelectedDate}
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            className={[
              "rounded-full border px-4 py-2 text-sm transition",
              filter === item.value
                ? "border-sky-700 bg-sky-950/50 text-sky-300"
                : "border-slate-700 text-slate-400 hover:bg-slate-900",
            ].join(" ")}
            type="button"
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-400"
          role="status"
        >
          Carregando tarefas...
        </div>
      ) : (
        <>
          {view === "day" ? (
            <DailyPlannerView
              date={selectedDate}
              tasks={filteredTasks}
              saving={saving}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onCreateForDate={openCreateForDate}
            />
          ) : null}

          {view === "week" ? (
            <WeeklyPlannerView
              date={selectedDate}
              tasks={filteredTasks}
              onSelectDate={selectCalendarDate}
              onSelectTask={openEditForm}
            />
          ) : null}

          {view === "month" ? (
            <MonthlyPlannerView
              date={selectedDate}
              tasks={filteredTasks}
              onSelectDate={selectCalendarDate}
              onSelectTask={openEditForm}
            />
          ) : null}
        </>
      )}

      {!loading && unscheduledTasks.length > 0 ? (
        <section className="space-y-4">
          <div>
            <p className="text-sm text-slate-400">Caixa de entrada</p>
            <h3 className="text-xl font-semibold">
              Sem data planejada
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Estas tarefas existem, mas ainda não ocupam um dia no
              calendário.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {unscheduledTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                disabled={saving}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
