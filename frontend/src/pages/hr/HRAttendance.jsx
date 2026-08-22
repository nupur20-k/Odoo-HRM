import { useEffect, useMemo, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Table, inputClass } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";
import StatusPill from "../../components/StatusPill";
import { Search } from "lucide-react";

export default function HRAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.hrGetAttendance();
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) => r.name?.toLowerCase().includes(q) || r.employee_id?.toLowerCase().includes(q)
    );
  }, [records, query]);

  return (
    <div>
      <PageHeader
        eyebrow="HR"
        title="Attendance"
        action={
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input
              className={`${inputClass} w-56 pl-9`}
              placeholder="Search by name or ID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
      />

      <ErrorNotice message={error} onRetry={load} />

      {loading ? (
        <Loader label="Loading attendance" />
      ) : filtered.length === 0 ? (
        <EmptyState title="No attendance records found" />
      ) : (
        <Table columns={["Employee", "Date", "Check-in", "Check-out", "Status"]}>
          {filtered.map((r) => (
            <tr key={r.id} className="hover:bg-paper">
              <td className="whitespace-nowrap px-4 py-3">
                <p className="text-ink">{r.name}</p>
                <p className="font-mono-num text-xs text-slate">{r.employee_id}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">{r.date}</td>
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
