import { auth, db } from "./firebase";
import { FirebaseAuthRepository } from "../repositories/firebase/FirebaseAuthRepository";
import { FirebaseUserRepository } from "../repositories/firebase/FirebaseUserRepository";
import { AuthService } from "../services/AuthService";

const authRepository = new FirebaseAuthRepository(auth);
const userRepository = new FirebaseUserRepository(db);

export const authService = new AuthService(
  authRepository,
  userRepository,
);
