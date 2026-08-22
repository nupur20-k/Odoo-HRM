import { useEffect, useState } from "react";

// Signature element: a small arc that reads the shift like a sundial —
// filling from check-in toward an 8-hour workday, in Dayflow's sage.
function timeStringToMinutes(t) {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export default function DayArc({ checkIn, checkOut, size = 56 }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (checkOut) return;
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, [checkOut]);

  const SHIFT_MINUTES = 8 * 60;
  const startMin = timeStringToMinutes(checkIn);
  const endMin = checkOut
    ? timeStringToMinutes(checkOut)
    : now.getHours() * 60 + now.getMinutes();

  let progress = 0;
  if (startMin !== null) {
    const elapsed = Math.max(0, endMin - startMin);
    progress = Math.min(1, elapsed / SHIFT_MINUTES);
  }

  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  const color = checkOut ? "var(--color-slate)" : "var(--color-sage)";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="4"
        />
        {startMin !== null && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono-num text-[10px] text-ink-soft">
          {startMin === null ? "—" : `${Math.round(progress * 100)}%`}
        </span>
      </div>
    </div>
  );
}
