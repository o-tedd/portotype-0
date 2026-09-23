import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import type {
  Task,
  TaskDifficulty,
  TaskFormInput,
  TaskPriority,
} from "../../types/task";

interface TaskFormProps {
  task?: Task | null;
  defaultScheduledAt?: Date;
  submitting: boolean;
  onSubmit(input: TaskFormInput): Promise<void>;
  onCancel(): void;
}

function toDateTimeLocal(date?: Date): string {
  if (!date) {
    return "";
  }

  const pad = (value: number) => String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    "-",
    pad(date.getMonth() + 1),
    "-",
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    ":",
    pad(date.getMinutes()),
  ].join("");
}

export function TaskForm({
  task,
  defaultScheduledAt,
  submitting,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [difficulty, setDifficulty] =
    useState<TaskDifficulty>("medium");
  const [scheduledAt, setScheduledAt] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
    setPriority(task?.priority ?? "medium");
    setDifficulty(task?.difficulty ?? "medium");
    setScheduledAt(
      toDateTimeLocal(task?.scheduledAt ?? defaultScheduledAt),
    );
    setDueDate(toDateTimeLocal(task?.dueDate));
    setEstimatedDuration(
      task?.estimatedDurationMinutes?.toString() ?? "",
    );
    setExternalUrl(task?.externalUrl ?? "");
    setNotes(task?.notes ?? "");
  }, [task, defaultScheduledAt]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedDuration = estimatedDuration
      ? Number(estimatedDuration)
      : undefined;

    const input: TaskFormInput = {
      title,
      description,
      priority,
      difficulty,
      scheduledAt: scheduledAt
        ? new Date(scheduledAt)
        : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      estimatedDurationMinutes: parsedDuration,
      externalUrl,
      notes,
    };

    try {
      await onSubmit(input);
    } catch {
      // O erro é apresentado pelo hook useTasks na página.
    }
  }

  return (
    <form
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">
            {task ? "Editar atividade" : "Nova atividade"}
          </p>
          <h3 className="text-xl font-semibold">
            {task ? task.title : "Adicionar tarefa"}
          </h3>
        </div>

        <button
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
          type="button"
          onClick={onCancel}
        >
          Fechar
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-medium">Título</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength={2}
            maxLength={120}
            required
            placeholder="Ex.: Estudar TypeScript"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-medium">Descrição</span>
          <textarea
            className="min-h-24 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Detalhes da atividade"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Prioridade</span>
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriority)
            }
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Dificuldade</span>
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500"
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as TaskDifficulty)
            }
          >
            <option value="easy">Fácil · 25 XP</option>
            <option value="medium">Média · 50 XP</option>
            <option value="hard">Difícil · 100 XP</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Planejada para
          </span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500"
            type="datetime-local"
            value={scheduledAt}
            onChange={(event) => setScheduledAt(event.target.value)}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Quando você pretende executar a tarefa.
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Prazo</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500"
            type="datetime-local"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Data limite; pode ser diferente da data planejada.
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Duração estimada (min)
          </span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500"
            type="number"
            min={1}
            max={10080}
            value={estimatedDuration}
            onChange={(event) => setEstimatedDuration(event.target.value)}
            placeholder="60"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-medium">
            Link externo
          </span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500"
            type="url"
            value={externalUrl}
            onChange={(event) => setExternalUrl(event.target.value)}
            placeholder="https://learn.microsoft.com/..."
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-medium">Observações</span>
          <textarea
            className="min-h-20 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Anotações pessoais sobre esta tarefa"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button
          className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Salvando..."
            : task
              ? "Salvar alterações"
              : "Criar tarefa"}
        </button>
      </div>
    </form>
  );
}
