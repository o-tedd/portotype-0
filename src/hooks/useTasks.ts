import { useCallback, useEffect, useState } from "react";
import { taskService } from "../config/services";
import type { Task, TaskFormInput, TaskStatus } from "../types/task";
import { useAuth } from "./useAuth";

function messageFromError(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Não foi possível concluir a operação.";
}

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      setTasks(await taskService.getTasks(user.id));
    } catch (caughtError) {
      setError(messageFromError(caughtError));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let active = true;

    if (!user) {
      queueMicrotask(() => {
        if (active) {
          setTasks([]);
          setError("");
          setLoading(false);
        }
      });

      return () => {
        active = false;
      };
    }

    void taskService
      .getTasks(user.id)
      .then((nextTasks) => {
        if (active) {
          setTasks(nextTasks);
          setError("");
        }
      })
      .catch((caughtError) => {
        if (active) {
          setError(messageFromError(caughtError));
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [user]);

  const runMutation = useCallback(
    async (operation: (userId: string) => Promise<void>) => {
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      setSaving(true);
      setError("");

      try {
        await operation(user.id);
        await loadTasks();
      } catch (caughtError) {
        const message = messageFromError(caughtError);
        setError(message);
        throw new Error(message, { cause: caughtError });
      } finally {
        setSaving(false);
      }
    },
    [loadTasks, user],
  );

  const createTask = useCallback(
    (input: TaskFormInput) =>
      runMutation(async (userId) => {
        await taskService.createTask(userId, input);
      }),
    [runMutation],
  );

  const updateTask = useCallback(
    (taskId: string, input: TaskFormInput) =>
      runMutation((userId) =>
        taskService.updateTask(userId, taskId, input),
      ),
    [runMutation],
  );

  const deleteTask = useCallback(
    (taskId: string) =>
      runMutation((userId) => taskService.deleteTask(userId, taskId)),
    [runMutation],
  );

  const setStatus = useCallback(
    (taskId: string, status: TaskStatus) =>
      runMutation((userId) =>
        taskService.setStatus(userId, taskId, status),
      ),
    [runMutation],
  );

  return {
    tasks,
    loading,
    saving,
    error,
    reload: loadTasks,
    createTask,
    updateTask,
    deleteTask,
    setStatus,
  };
}
