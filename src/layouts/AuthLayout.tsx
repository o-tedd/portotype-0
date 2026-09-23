import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <main className="grid min-h-screen bg-slate-950 text-slate-100 lg:grid-cols-[1fr_1.1fr]">
      <section className="hidden border-r border-slate-800 bg-slate-900/60 p-12 lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-medium tracking-[0.2em] text-sky-400">
            PORTOTYPE "0"
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight">
            Planeje seus estudos, acompanhe seu tempo e evolua com consistência.
          </h1>
          <p className="mt-5 max-w-lg text-slate-400">
            Um planner de produtividade construído para organizar tarefas,
            sessões de estudo, metas e evolução em um só lugar.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          MVP 0.2 · Firebase Authentication
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="text-sm font-semibold tracking-[0.18em] text-sky-400">
              PORTOTYPE "0"
            </p>
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
