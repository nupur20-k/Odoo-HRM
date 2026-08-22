export default function PageHeader({ eyebrow, title, action, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-slate">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-2xl text-ink">{title}</h1>
        </div>
        {action}
      </div>
      {children}
      <div className="mt-5 h-px w-full bg-line" />
    </div>
  );
}
