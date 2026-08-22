export function Loader({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-3 py-16 justify-center text-ink-soft">
      <span className="h-4 w-4 rounded-full border-2 border-line-strong border-t-sage animate-spin" />
      <span className="text-sm">{label}…</span>
    </div>
  );
}

export function EmptyState({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-16 px-6">
      <p className="font-display text-lg text-ink">{title}</p>
      {hint && <p className="text-sm text-ink-soft max-w-sm">{hint}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function ErrorNotice({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-clay/20 bg-clay-soft px-4 py-3 text-sm text-clay">
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 font-medium underline underline-offset-2 hover:opacity-80"
        >
          Try again
        </button>
      )}
    </div>
  );
}
