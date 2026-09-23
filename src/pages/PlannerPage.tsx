import { useMemo, useState } from "react";
import { TaskCard } from "../components/tasks/TaskCard";
import { TaskForm } from "../components/tasks/TaskForm";
import { useTasks } from "../hooks/useTasks";
import type {
  Task,
  TaskFormInput,
  TaskStatus,
} from "../types/task";
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

  const [filter, setFilter] = useState<TaskFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const visibleTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    if (filter === "overdue") {
      return tasks.filter((task) => isTaskOverdue(task));
    }

    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  function openCreateForm() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function closeForm() {
    setEditingTask(null);
    setFormOpen(false);
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
            Crie e acompanhe suas atividades. As visualizações diária,
            semanal e mensal entram no próximo milestone do Planner.
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
          key={editingTask?.id ?? "new-task"}
          task={editingTask}
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
      ) : visibleTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <p className="font-medium">Nenhuma tarefa encontrada.</p>
          <p className="mt-2 text-sm text-slate-500">
            Crie uma nova tarefa ou selecione outro filtro.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {visibleTasks.map((task) => (
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
      )}
    </section>
  );
}
