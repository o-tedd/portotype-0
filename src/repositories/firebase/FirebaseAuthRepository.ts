import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Auth,
  type User,
} from "firebase/auth";
import type {
  AuthRepository,
  AuthStateListener,
} from "../contracts/AuthRepository";
import type {
  AuthUser,
  LoginInput,
  RegisterInput,
} from "../../types/auth";

function mapUser(user: User): AuthUser {
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
  };
}

function toFriendlyAuthError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("Não foi possível concluir a autenticação.");
  }

  const message = error.message;

  if (message.includes("auth/invalid-credential")) {
    return new Error("E-mail ou senha inválidos.");
  }

  if (message.includes("auth/email-already-in-use")) {
    return new Error("Este e-mail já está cadastrado.");
  }

  if (message.includes("auth/weak-password")) {
    return new Error("A senha informada é muito fraca.");
  }

  if (message.includes("auth/invalid-email")) {
    return new Error("Informe um endereço de e-mail válido.");
  }

  if (message.includes("auth/too-many-requests")) {
    return new Error("Muitas tentativas. Aguarde alguns minutos e tente novamente.");
  }

  return new Error("Não foi possível concluir a autenticação. Tente novamente.");
}

export class FirebaseAuthRepository implements AuthRepository {
  constructor(private readonly auth: Auth) {}

  private async ensureLocalPersistence(): Promise<void> {
    await setPersistence(this.auth, browserLocalPersistence);
  }

  async login(input: LoginInput): Promise<AuthUser> {
    try {
      await this.ensureLocalPersistence();

      const credential = await signInWithEmailAndPassword(
        this.auth,
        input.email.trim(),
        input.password,
      );

      return mapUser(credential.user);
    } catch (error) {
      throw toFriendlyAuthError(error);
    }
  }

  async register(input: RegisterInput): Promise<AuthUser> {
    try {
      await this.ensureLocalPersistence();

      const credential = await createUserWithEmailAndPassword(
        this.auth,
        input.email.trim(),
        input.password,
      );

      const name = input.name.trim();

      if (name) {
        await updateProfile(credential.user, { displayName: name });
      }

      return mapUser(credential.user);
    } catch (error) {
      throw toFriendlyAuthError(error);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email.trim());
    } catch (error) {
      throw toFriendlyAuthError(error);
    }
  }

  subscribe(listener: AuthStateListener): () => void {
    return onAuthStateChanged(this.auth, (user) => {
      listener(user ? mapUser(user) : null);
    });
  }
}
