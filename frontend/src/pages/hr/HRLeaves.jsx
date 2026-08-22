import { useEffect, useMemo, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Table, Button, inputClass } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";
import StatusPill from "../../components/StatusPill";
import { Check, X } from "lucide-react";

const FILTERS = ["PENDING", "APPROVED", "REJECTED", "ALL"];

export default function HRLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("PENDING");
  const [commentDrafts, setCommentDrafts] = useState({});
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.hrGetLeaves();
      setLeaves(res.leaves || []);
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
    if (filter === "ALL") return leaves;
    return leaves.filter((l) => l.status === filter);
  }, [leaves, filter]);

  const decide = async (id, status) => {
    setBusyId(id);
    setError("");
    try {
      await api.hrUpdateLeave(id, status, commentDrafts[id] || "");
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="HR" title="Leave requests" />
      <ErrorNotice message={error} onRetry={load} />

      <div className="mb-4 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-ink text-paper"
                : "border border-line text-ink-soft hover:bg-paper"
            }`}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading leave requests" />
      ) : filtered.length === 0 ? (
        <EmptyState title="Nothing here" hint="No leave requests match this filter." />
      ) : (
        <Table columns={["Employee", "Type", "Dates", "Reason", "Status", ""]}>
          {filtered.map((l) => (
            <tr key={l.id} className="align-top hover:bg-paper">
              <td className="whitespace-nowrap px-4 py-3">
                <p className="text-ink">{l.name}</p>
                <p className="font-mono-num text-xs text-slate">
                  {l.employee_id} · {l.department || "—"}
                </p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{l.leave_type}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">
                {l.start_date} → {l.end_date}
              </td>
              <td className="max-w-[16rem] px-4 py-3 text-ink-soft">{l.reason || "—"}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusPill status={l.status} />
                {l.hr_comment && (
                  <p className="mt-1 max-w-[10rem] text-xs text-ink-soft">“{l.hr_comment}”</p>
                )}
              </td>
              <td className="px-4 py-3">
                {l.status === "PENDING" ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className={`${inputClass} text-xs`}
                      placeholder="Comment (optional)"
                      value={commentDrafts[l.id] || ""}
                      onChange={(e) =>
                        setCommentDrafts({ ...commentDrafts, [l.id]: e.target.value })
                      }
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="sage"
                        className="px-2.5 py-1.5 text-xs"
                        disabled={busyId === l.id}
                        onClick={() => decide(l.id, "APPROVED")}
                      >
                        <Check size={13} /> Approve
                      </Button>
                      <Button
                        variant="clay"
                        className="px-2.5 py-1.5 text-xs"
                        disabled={busyId === l.id}
                        onClick={() => decide(l.id, "REJECTED")}
                      >
                        <X size={13} /> Reject
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-slate">Decided</span>
                )}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
