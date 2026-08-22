import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/PageHeader";
import { Card } from "../../components/ui";
import { Loader, ErrorNotice } from "../../components/States";
import StatusPill from "../../components/StatusPill";
import { Users, Clock, CalendarDays, ArrowRight } from "lucide-react";

export default function HROverview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [e, a, l] = await Promise.all([
        api.hrGetEmployees(),
        api.hrGetAttendance(),
        api.hrGetLeaves(),
      ]);
      setEmployees(e.employees || []);
      setAttendance(a.attendance || []);
      setLeaves(l.leaves || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loader label="Loading workspace" />;

  const today = new Date().toISOString().slice(0, 10);
  const presentToday = attendance.filter((a) => a.date === today && a.status === "PRESENT").length;
  const pendingLeaves = leaves.filter((l) => l.status === "PENDING");

  return (
    <div>
      <PageHeader eyebrow="HR Overview" title={`Welcome back, ${user?.name?.split(" ")[0]}`} />
      <ErrorNotice message={error} onRetry={load} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2 text-slate">
            <Users size={16} />
            <p className="text-xs font-medium uppercase tracking-widest">Headcount</p>
          </div>
          <p className="mt-3 font-display text-3xl text-ink">{employees.length}</p>
          <p className="text-sm text-ink-soft">active employees</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-slate">
            <Clock size={16} />
            <p className="text-xs font-medium uppercase tracking-widest">Present today</p>
          </div>
          <p className="mt-3 font-display text-3xl text-ink">{presentToday}</p>
          <p className="text-sm text-ink-soft">of {employees.length} checked in</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-slate">
            <CalendarDays size={16} />
            <p className="text-xs font-medium uppercase tracking-widest">Leave requests</p>
          </div>
          <p className="mt-3 font-display text-3xl text-ink">{pendingLeaves.length}</p>
          <p className="text-sm text-ink-soft">awaiting your review</p>
        </Card>
      </div>

      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg text-ink">Pending leave requests</p>
          <Link to="/hr/leaves" className="flex items-center gap-1 text-sm text-sage hover:underline">
            Review all <ArrowRight size={14} />
          </Link>
        </div>
        {pendingLeaves.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">Nothing waiting on you right now.</p>
        ) : (
          <ul className="mt-3 divide-y divide-line">
            {pendingLeaves.slice(0, 5).map((l) => (
              <li key={l.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="text-ink">
                    {l.name} <span className="text-ink-soft">· {l.leave_type}</span>
                  </p>
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
    </div>
  );
}
