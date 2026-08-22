const STYLES = {
  PRESENT: "bg-sage-soft text-sage",
  APPROVED: "bg-sage-soft text-sage",
  ACTIVE: "bg-sage-soft text-sage",
  PENDING: "bg-amber-soft text-amber",
  ABSENT: "bg-clay-soft text-clay",
  REJECTED: "bg-clay-soft text-clay",
  INACTIVE: "bg-clay-soft text-clay",
  LATE: "bg-amber-soft text-amber",
};

export default function StatusPill({ status }) {
  const key = (status || "").toUpperCase();
  const cls = STYLES[key] || "bg-line/60 text-ink-soft";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || "—"}
    </span>
  );
}
