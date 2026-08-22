import { useEffect, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Card } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

export default function Payroll() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getMyPayroll();
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

  return (
    <div>
      <PageHeader eyebrow="Payroll" title="Your payslips" />
      <ErrorNotice message={error} onRetry={load} />

      {loading ? (
        <Loader label="Loading payslips" />
      ) : records.length === 0 ? (
        <EmptyState title="No payslips yet" hint="They'll show up here once HR runs payroll." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {records.map((p) => (
            <Card key={p.id}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-widest text-slate">
                  Payslip #{p.id}
                </p>
              </div>
              <p className="mt-2 font-mono-num font-display text-3xl text-ink">
                {inr(p.net_salary)}
              </p>
              <p className="text-sm text-ink-soft">net salary</p>

              <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Basic salary</span>
                  <span className="font-mono-num text-ink">{inr(p.basic_salary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Allowances</span>
                  <span className="font-mono-num text-sage">+{inr(p.allowances)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Deductions</span>
                  <span className="font-mono-num text-clay">-{inr(p.deductions)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
