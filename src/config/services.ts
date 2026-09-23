import { auth, db } from "./firebase";
import { FirebaseAuthRepository } from "../repositories/firebase/FirebaseAuthRepository";
import { FirebaseTaskRepository } from "../repositories/firebase/FirebaseTaskRepository";
import { FirebaseUserRepository } from "../repositories/firebase/FirebaseUserRepository";
import { AuthService } from "../services/AuthService";
import { TaskService } from "../services/TaskService";

const authRepository = new FirebaseAuthRepository(auth);
const userRepository = new FirebaseUserRepository(db);
const taskRepository = new FirebaseTaskRepository(db);

export const authService = new AuthService(
  authRepository,
  userRepository,
);

export const taskService = new TaskService(taskRepository);
