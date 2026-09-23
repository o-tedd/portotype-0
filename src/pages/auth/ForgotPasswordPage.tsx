import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setSubmitting(true);

    try {
      await sendPasswordReset(email);
      setSuccess(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível enviar o e-mail.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-400">Recuperação de acesso</p>
      <h2 className="mt-1 text-3xl font-bold">Redefinir senha</h2>
      <p className="mt-2 text-sm text-slate-400">
        Informe seu e-mail e enviaremos as instruções de recuperação.
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

        {success ? (
          <p
            className="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-3 text-sm text-emerald-300"
            role="status"
          >
            Se o endereço estiver disponível para recuperação, você receberá as
            instruções por e-mail.
          </p>
        ) : null}

        <button
          className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Enviar recuperação"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link className="text-sky-400 hover:text-sky-300" to="/login">
          Voltar para o login
        </Link>
      </p>
    </div>
  );
}
