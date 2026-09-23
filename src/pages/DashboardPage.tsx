const metrics = [
  ["Hoje", "0 min"],
  ["Streak", "0 dias"],
  ["Concluídas", "0"],
];

export function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-slate-400">Visão geral</p>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Nível 1 · Iniciante</p>
            <p className="mt-1 text-xl font-semibold">0 / 100 XP</p>
          </div>
          <span className="text-sm text-slate-400">0%</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-0 rounded-full bg-sky-500" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">Tarefas de hoje</h3>
          <p className="mt-3 text-sm text-slate-400">
            Nenhuma tarefa cadastrada ainda.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">Próximos prazos</h3>
          <p className="mt-3 text-sm text-slate-400">
            Seus próximos prazos aparecerão aqui.
          </p>
        </article>
      </div>
    </section>
  );
}
