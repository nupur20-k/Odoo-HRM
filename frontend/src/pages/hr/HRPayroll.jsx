import { useEffect, useMemo, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Table, Card, inputClass } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";
import { Search } from "lucide-react";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

export default function HRPayroll() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.hrGetPayroll();
      setRecords(res.payroll || []);
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

  const totalNet = records.reduce((sum, r) => sum + r.net_salary, 0);

  return (
    <div>
      <PageHeader
        eyebrow="HR"
        title="Payroll"
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

      {!loading && records.length > 0 && (
        <Card className="mb-5 inline-flex items-baseline gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-slate">
            Total net payroll
          </span>
          <span className="font-mono-num font-display text-xl text-ink">{inr(totalNet)}</span>
        </Card>
      )}

      {loading ? (
        <Loader label="Loading payroll" />
      ) : filtered.length === 0 ? (
        <EmptyState title="No payroll records found" />
      ) : (
        <Table columns={["Employee", "Basic", "Allowances", "Deductions", "Net salary"]}>
          {filtered.map((p) => (
            <tr key={p.id} className="hover:bg-paper">
              <td className="whitespace-nowrap px-4 py-3">
                <p className="text-ink">{p.name}</p>
                <p className="font-mono-num text-xs text-slate">{p.employee_id}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">
                {inr(p.basic_salary)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-sage">
                +{inr(p.allowances)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-clay">
                -{inr(p.deductions)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num font-medium text-ink">
                {inr(p.net_salary)}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
