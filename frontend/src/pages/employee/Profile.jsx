import { useEffect, useState } from "react";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Card } from "../../components/ui";
import { Loader, ErrorNotice } from "../../components/States";

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3 text-sm last:border-0">
      <span className="text-ink-soft">{label}</span>
      <span className="font-medium text-ink">{value || "—"}</span>
    </div>
  );
}

export default function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getMyProfile();
      setEmployee(res.employee);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loader label="Loading profile" />;

  return (
    <div>
      <PageHeader eyebrow="Profile" title="Your details" />
      <ErrorNotice message={error} onRetry={load} />

      {employee && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center md:col-span-1">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-soft font-display text-2xl text-sage">
              {employee.name?.[0]?.toUpperCase()}
            </div>
            <p className="mt-4 font-display text-lg text-ink">{employee.name}</p>
            <p className="text-sm text-ink-soft">{employee.designation || "—"}</p>
            <p className="mt-1 font-mono-num text-xs text-slate">{employee.employee_id}</p>
          </Card>

          <Card className="md:col-span-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-slate">
              Employment
            </p>
            <Row label="Email" value={employee.email} />
            <Row label="Department" value={employee.department} />
            <Row label="Designation" value={employee.designation} />
            <Row label="Phone" value={employee.phone} />
            <Row label="Address" value={employee.address} />
            <Row label="Joining date" value={employee.joining_date} />
            <Row label="Role" value={employee.role} />
          </Card>
        </div>
      )}
    </div>
  );
}
