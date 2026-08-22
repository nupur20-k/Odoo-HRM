import { useEffect, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Table, Button } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";
import StatusPill from "../../components/StatusPill";
import { Clock } from "lucide-react";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getMyAttendance();
      setRecords(res.attendance || []);
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
  const todayRecord = records.find((r) => r.date === today);

  const act = async (fn) => {
    setActionLoading(true);
    setError("");
    try {
      await fn();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Attendance"
        title="Your attendance"
        action={
          !todayRecord ? (
            <Button variant="sage" onClick={() => act(api.checkIn)} disabled={actionLoading}>
              <Clock size={16} /> Check in
            </Button>
          ) : !todayRecord.check_out ? (
            <Button onClick={() => act(api.checkOut)} disabled={actionLoading}>
              <Clock size={16} /> Check out
            </Button>
          ) : null
        }
      />

      <ErrorNotice message={error} onRetry={load} />

      {loading ? (
        <Loader label="Loading attendance" />
      ) : records.length === 0 ? (
        <EmptyState
          title="No attendance recorded yet"
          hint="Check in for the first time to start building your record."
        />
      ) : (
        <Table columns={["Date", "Check-in", "Check-out", "Status"]}>
          {records.map((r) => (
            <tr key={r.id} className="hover:bg-paper">
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink">{r.date}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">
                {r.check_in?.slice(0, 5) || "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">
                {r.check_out?.slice(0, 5) || "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusPill status={r.status} />
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
