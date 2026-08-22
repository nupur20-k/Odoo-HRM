import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import PageHeader from "../../components/PageHeader";
import { Table, inputClass } from "../../components/ui";
import { Loader, EmptyState, ErrorNotice } from "../../components/States";
import { Search } from "lucide-react";

export default function HREmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.hrGetEmployees();
      setEmployees(res.employees || []);
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
    if (!q) return employees;
    return employees.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) ||
        e.employee_id?.toLowerCase().includes(q) ||
        e.department?.toLowerCase().includes(q) ||
        e.designation?.toLowerCase().includes(q)
    );
  }, [employees, query]);

  return (
    <div>
      <PageHeader
        eyebrow="HR"
        title="Employees"
        action={
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input
              className={`${inputClass} w-56 pl-9`}
              placeholder="Search employees"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
      />

      <ErrorNotice message={error} onRetry={load} />

      {loading ? (
        <Loader label="Loading employees" />
      ) : filtered.length === 0 ? (
        <EmptyState title="No employees found" hint="Try a different search term." />
      ) : (
        <Table columns={["Employee ID", "Name", "Department", "Designation", "Phone"]}>
          {filtered.map((e) => (
            <tr key={e.id} className="hover:bg-paper">
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-slate">
                {e.employee_id}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <Link
                  to={`/hr/employees/${e.employee_id}`}
                  className="font-medium text-ink hover:text-sage hover:underline"
                >
                  {e.name}
                </Link>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{e.department || "—"}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{e.designation || "—"}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono-num text-ink-soft">
                {e.phone || "—"}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
