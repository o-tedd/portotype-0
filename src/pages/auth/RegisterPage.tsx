import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não são iguais.");
      return;
    }

    setSubmitting(true);

    try {
      await register({ name, email, password });
      navigate("/app/dashboard", { replace: true });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível criar a conta.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-400">Comece sua jornada</p>
      <h2 className="mt-1 text-3xl font-bold">Criar conta</h2>
      <p className="mt-2 text-sm text-slate-400">
        Seus dados serão vinculados ao UID da sua conta Firebase.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Nome</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">E-mail</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Senha</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Confirmar senha</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>

        {error ? (
          <p
            className="rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Já possui conta?{" "}
        <Link className="font-medium text-sky-400 hover:text-sky-300" to="/login">
          Entrar
        </Link>
      </p>
    </div>
  );
}
