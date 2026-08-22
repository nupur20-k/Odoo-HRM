import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { inputClass } from "../components/ui";
import { ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-paper">
      {/* Left: brand panel with the day-arc motif as the hero thesis */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink p-12 text-paper lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-paper">
            <span className="font-display text-sm text-ink">D</span>
          </div>
          <span className="font-display text-lg">Dayflow</span>
        </div>

        <div>
          <ShiftArcHero />
          <h1 className="mt-10 max-w-md font-display text-4xl leading-tight">
            The workday,
            <br />
            laid out clearly.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-paper/60">
            Attendance, leave, and payroll in one place — for everyone on the
            team, and for the people who run it.
          </p>
        </div>

        <p className="text-xs text-paper/40">
          Dayflow HR &middot; internal workspace
        </p>
      </div>

      {/* Right: login form */}
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
                <span className="font-display text-sm text-paper">D</span>
              </div>
              <span className="font-display text-lg">Dayflow</span>
            </div>
          </div>

          <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-slate">
            Sign in
          </p>
          <h2 className="mb-8 font-display text-2xl text-ink">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-soft">
                Work email
              </span>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-soft">
                Password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </label>

            {error && (
              <p className="rounded-lg bg-clay-soft px-3 py-2 text-sm text-clay">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ShiftArcHero() {
  const size = 132;
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(251,249,245,0.15)"
        strokeWidth="6"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#4F7566"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * 0.35}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-mono-num"
        fill="#FBF9F5"
        fontSize="20"
      >
        9:24
      </text>
      <text
        x="50%"
        y="68%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(251,249,245,0.5)"
        fontSize="9"
      >
        AM CHECK-IN
      </text>
    </svg>
  );
}
