import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/PageHeader";
import { Card, Button } from "../../components/ui";
import { Loader, ErrorNotice } from "../../components/States";
import StatusPill from "../../components/StatusPill";
import DayArc from "../../components/DayArc";
import { Clock, CalendarDays, Wallet, ArrowRight } from "lucide-react";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Overview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [a, l, p] = await Promise.all([
        api.getMyAttendance(),
        api.getMyLeaves(),
        api.getMyPayroll(),
      ]);
      setAttendance(a.attendance || []);
      setLeaves(l.leaves || []);
      setPayroll(p.payroll || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayRecord = attendance.find((r) => r.date === today);
  const pendingLeaves = leaves.filter((l) => l.status === "PENDING");
  const latestPayslip = payroll[0];

  const handleCheckIn = async () => {
    setActionLoading(true);
    setError("");
    try {
      await api.checkIn();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setActionLoading(true);
    setError("");
    try {
      await api.checkOut();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Loader label="Loading your day" />;

  return (
    <div>
      <PageHeader eyebrow="Overview" title={`${greeting()}, ${user?.name?.split(" ")[0] || ""}`} />

      <ErrorNotice message={error} onRetry={load} />

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Today's attendance */}
        <Card className="md:col-span-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <DayArc checkIn={todayRecord?.check_in} checkOut={todayRecord?.check_out} size={64} />
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate">
                  Today
                </p>
                <p className="font-display text-xl text-ink">
                  {todayRecord ? "You're checked in" : "Not checked in yet"}
                </p>
                <p className="mt-1 font-mono-num text-sm text-ink-soft">
                  {todayRecord?.check_in
                    ? `In ${todayRecord.check_in.slice(0, 5)}`
                    : "—"}
                  {todayRecord?.check_out
                    ? ` · Out ${todayRecord.check_out.slice(0, 5)}`
                    : ""}
                </p>
              </div>
            </div>
            {todayRecord && <StatusPill status={todayRecord.status} />}
          </div>

          <div className="mt-5 flex gap-3">
            {!todayRecord && (
              <Button variant="sage" onClick={handleCheckIn} disabled={actionLoading}>
                <Clock size={16} /> Check in
              </Button>
            )}
            {todayRecord && !todayRecord.check_out && (
              <Button variant="primary" onClick={handleCheckOut} disabled={actionLoading}>
                <Clock size={16} /> Check out
              </Button>
            )}
            {todayRecord?.check_out && (
              <p className="text-sm text-ink-soft">
                Shift complete for today. See you tomorrow.
              </p>
            )}
            <Link to="/attendance" className="ml-auto self-center text-sm text-sage hover:underline">
              View history →
            </Link>
          </div>
        </Card>

        {/* Leave summary */}
        <Card>
          <div className="flex items-center gap-2 text-slate">
            <CalendarDays size={16} />
            <p className="text-xs font-medium uppercase tracking-widest">Leave</p>
          </div>
          <p className="mt-3 font-display text-3xl text-ink">{pendingLeaves.length}</p>
          <p className="text-sm text-ink-soft">pending request{pendingLeaves.length === 1 ? "" : "s"}</p>
          <Link
            to="/leave"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage hover:underline"
          >
            Request leave <ArrowRight size={14} />
          </Link>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="flex items-center gap-2 text-slate">
            <CalendarDays size={16} />
            <p className="text-xs font-medium uppercase tracking-widest">Recent leave activity</p>
          </div>
          {leaves.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No leave requests yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {leaves.slice(0, 4).map((l) => (
                <li key={l.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="text-ink">{l.leave_type}</p>
                    <p className="font-mono-num text-xs text-ink-soft">
                      {l.start_date} → {l.end_date}
                    </p>
                  </div>
                  <StatusPill status={l.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-slate">
            <Wallet size={16} />
            <p className="text-xs font-medium uppercase tracking-widest">Latest payslip</p>
          </div>
          {latestPayslip ? (
            <>
              <p className="mt-3 font-mono-num font-display text-2xl text-ink">
                ₹{latestPayslip.net_salary.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-ink-soft">net salary</p>
              <Link
                to="/payroll"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage hover:underline"
              >
                View payslips <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">No payroll records yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
