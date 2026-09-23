import { NavLink, Outlet } from "react-router";

const navigation = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/planner", label: "Planner" },
  { to: "/app/statistics", label: "Estatísticas" },
  { to: "/app/certificates", label: "Certificados" },
  { to: "/app/profile", label: "Perfil" },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:grid md:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-slate-800 bg-slate-900/70 p-5 md:block">
        <h1 className="text-xl font-bold tracking-tight">PORTOTYPE "0"</h1>
        <p className="mt-1 text-xs text-slate-400">Productivity System</p>

        <nav className="mt-8 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-4 md:px-8">
          <div>
            <p className="text-sm text-slate-400">MVP 0.1</p>
            <p className="font-semibold">Foundation</p>
          </div>
          <div className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
            LV 1
          </div>
        </header>

        <main className="p-4 pb-24 md:p-8">
          <Outlet />
        </main>

        <nav className="fixed inset-x-0 bottom-0 grid grid-cols-5 border-t border-slate-800 bg-slate-900 p-2 md:hidden">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-md px-1 py-2 text-center text-[11px]",
                  isActive ? "bg-slate-800 text-white" : "text-slate-400",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
