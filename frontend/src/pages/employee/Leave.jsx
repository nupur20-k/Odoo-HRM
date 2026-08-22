import { useEffect, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Card, Button, Field, inputClass, Table } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";
import StatusPill from "../../components/StatusPill";

const LEAVE_TYPES = ["CASUAL", "SICK", "EARNED", "UNPAID"];

export default function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    leave_type: "CASUAL",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getMyLeaves();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await api.createLeave(form);
      setSuccess("Leave request submitted.");
      setForm({ leave_type: "CASUAL", start_date: "", end_date: "", reason: "" });
      await load();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Leave" title="Request time off" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2 h-fit">
          <p className="mb-4 font-display text-lg text-ink">New request</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Leave type">
              <select
                className={inputClass}
                value={form.leave_type}
                onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
              >
                {LEAVE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0) + t.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Start date">
                <input
                  type="date"
                  required
                  className={inputClass}
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
              </Field>
              <Field label="End date">
                <input
                  type="date"
                  required
                  className={inputClass}
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Reason (optional)">
              <textarea
                rows={3}
                className={inputClass}
                placeholder="A short note for your manager"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </Field>

            {submitError && (
              <p className="rounded-lg bg-clay-soft px-3 py-2 text-sm text-clay">
                {submitError}
              </p>
            )}
            {success && (
              <p className="rounded-lg bg-sage-soft px-3 py-2 text-sm text-sage">
                {success}
              </p>
            )}

            <Button type="submit" variant="sage" disabled={submitting} className="w-full">
              {submitting ? "Submitting…" : "Submit request"}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-3">
          <ErrorNotice message={error} onRetry={load} />
          {loading ? (
            <Loader label="Loading requests" />
          ) : leaves.length === 0 ? (
            <EmptyState
              title="No leave requests yet"
              hint="Submit your first request using the form."
            />
          ) : (
            <Table columns={["Type", "Dates", "Status", "HR comment"]}>
              {leaves.map((l) => (
                <tr key={l.id} className="align-top hover:bg-paper">
                  <td className="whitespace-nowrap px-4 py-3 text-ink">{l.leave_type}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">
                    {l.start_date} → {l.end_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusPill status={l.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{l.hr_comment || "—"}</td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
