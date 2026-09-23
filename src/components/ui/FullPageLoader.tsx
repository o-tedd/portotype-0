export function FullPageLoader() {
  return (
    <div
      className="grid min-h-screen place-items-center bg-slate-950 text-slate-200"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-sky-400" />
        <p className="mt-3 text-sm text-slate-400">Carregando...</p>
      </div>
    </div>
  );
}
