import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login({ email, password });
      navigate("/app/dashboard", { replace: true });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível entrar.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-400">Bem-vindo de volta</p>
      <h2 className="mt-1 text-3xl font-bold">Entrar</h2>
      <p className="mt-2 text-sm text-slate-400">
        Acesse sua conta para continuar seu planejamento.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">E-mail</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@exemplo.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Senha</span>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <div className="flex justify-end">
          <Link
            className="text-sm text-sky-400 hover:text-sky-300"
            to="/forgot-password"
          >
            Esqueci minha senha
          </Link>
        </div>

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
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Ainda não tem uma conta?{" "}
        <Link className="font-medium text-sky-400 hover:text-sky-300" to="/register">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
