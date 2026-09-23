import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  type Firestore,
} from "firebase/firestore";
import type {
  CreateTaskRecord,
  TaskRepository,
  UpdateTaskRecord,
} from "../contracts/TaskRepository";
import type { Task } from "../../types/task";

interface FirebaseTaskData {
  title: string;
  description?: string;
  categoryId?: string;
  priority: Task["priority"];
  difficulty: Task["difficulty"];
  status: Task["status"];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  dueDate?: Timestamp;
  scheduledAt?: Timestamp;
  estimatedDurationMinutes?: number;
  externalUrl?: string;
  notes?: string;
  completedAt?: Timestamp;
  xpReward: number;
  xpGranted: boolean;
  certificateId?: string;
}

function taskCollectionPath(userId: string) {
  return ["users", userId, "tasks"] as const;
}

function toFirestoreTask(task: CreateTaskRecord): FirebaseTaskData {
  return {
    title: task.title,
    ...(task.description ? { description: task.description } : {}),
    ...(task.categoryId ? { categoryId: task.categoryId } : {}),
    priority: task.priority,
    difficulty: task.difficulty,
    status: task.status,
    createdAt: Timestamp.fromDate(task.createdAt),
    updatedAt: Timestamp.fromDate(task.updatedAt),
    ...(task.dueDate ? { dueDate: Timestamp.fromDate(task.dueDate) } : {}),
    ...(task.scheduledAt
      ? { scheduledAt: Timestamp.fromDate(task.scheduledAt) }
      : {}),
    ...(task.estimatedDurationMinutes !== undefined
      ? { estimatedDurationMinutes: task.estimatedDurationMinutes }
      : {}),
    ...(task.externalUrl ? { externalUrl: task.externalUrl } : {}),
    ...(task.notes ? { notes: task.notes } : {}),
    ...(task.completedAt
      ? { completedAt: Timestamp.fromDate(task.completedAt) }
      : {}),
    xpReward: task.xpReward,
    xpGranted: task.xpGranted,
    ...(task.certificateId ? { certificateId: task.certificateId } : {}),
  };
}

function fromFirestoreTask(
  id: string,
  userId: string,
  data: FirebaseTaskData,
): Task {
  return {
    id,
    userId,
    title: data.title,
    ...(data.description ? { description: data.description } : {}),
    ...(data.categoryId ? { categoryId: data.categoryId } : {}),
    priority: data.priority,
    difficulty: data.difficulty,
    status: data.status,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    ...(data.dueDate ? { dueDate: data.dueDate.toDate() } : {}),
    ...(data.scheduledAt
      ? { scheduledAt: data.scheduledAt.toDate() }
      : {}),
    ...(data.estimatedDurationMinutes !== undefined
      ? { estimatedDurationMinutes: data.estimatedDurationMinutes }
      : {}),
    ...(data.externalUrl ? { externalUrl: data.externalUrl } : {}),
    ...(data.notes ? { notes: data.notes } : {}),
    ...(data.completedAt
      ? { completedAt: data.completedAt.toDate() }
      : {}),
    xpReward: data.xpReward,
    xpGranted: data.xpGranted,
    ...(data.certificateId ? { certificateId: data.certificateId } : {}),
  };
}

function toFirestoreUpdate(data: UpdateTaskRecord): Record<string, unknown> {
  const converted: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      converted[key] = deleteField();
      continue;
    }

    if (
      ["updatedAt", "dueDate", "scheduledAt", "completedAt"].includes(key) &&
      value instanceof Date
    ) {
      converted[key] = Timestamp.fromDate(value);
      continue;
    }

    converted[key] = value;
  }

  return converted;
}

export class FirebaseTaskRepository implements TaskRepository {
  constructor(private readonly db: Firestore) {}

  async findAll(userId: string): Promise<Task[]> {
    const [root, uid, child] = taskCollectionPath(userId);
    const tasksQuery = query(
      collection(this.db, root, uid, child),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(tasksQuery);

    return snapshot.docs.map((taskDocument) =>
      fromFirestoreTask(
        taskDocument.id,
        userId,
        taskDocument.data() as FirebaseTaskData,
      ),
    );
  }

  async findById(
    userId: string,
    taskId: string,
  ): Promise<Task | null> {
    const snapshot = await getDoc(
      doc(this.db, "users", userId, "tasks", taskId),
    );

    if (!snapshot.exists()) {
      return null;
    }

    return fromFirestoreTask(
      snapshot.id,
      userId,
      snapshot.data() as FirebaseTaskData,
    );
  }

  async create(task: CreateTaskRecord): Promise<Task> {
    const reference = await addDoc(
      collection(this.db, "users", task.userId, "tasks"),
      toFirestoreTask(task),
    );

    return {
      id: reference.id,
      ...task,
    };
  }

  async update(
    userId: string,
    taskId: string,
    data: UpdateTaskRecord,
  ): Promise<void> {
    await updateDoc(
      doc(this.db, "users", userId, "tasks", taskId),
      toFirestoreUpdate(data),
    );
  }

  async delete(userId: string, taskId: string): Promise<void> {
    await deleteDoc(doc(this.db, "users", userId, "tasks", taskId));
  }
}
