import { useEffect, useMemo, useState } from "react";

import { listItems } from "../api/crud";
import { getApiErrorMessage } from "../api/client";
import { DataTable } from "../components/DataTable";
import { FilterDropdown } from "../components/FilterDropdown";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import type { RecordItem } from "../types/crud";

export function AuditLogsPage() {
  const [items, setItems] = useState<RecordItem[]>([]);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [module, setModule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (startDate) params.start_date = new Date(startDate).toISOString();
        if (endDate) params.end_date = new Date(endDate).toISOString();
        setItems(await listItems("/audit-logs", params));
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [startDate, endDate]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
      const matchesAction = action ? item.action === action : true;
      const matchesModule = module ? item.module === module : true;
      return matchesSearch && matchesAction && matchesModule;
    });
  }, [items, search, action, module]);

  return (
    <div className="space-y-5">
      <PageHeader title="Audit Logs" description="Trace user and system activity across ERP modules." />
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchInput value={search} onChange={setSearch} />
        <FilterDropdown label="Module" value={module} onChange={setModule} options={["authentication", "hr", "inventory", "procurement", "sales", "finance", "notifications", "system"]} />
        <FilterDropdown label="Action" value={action} onChange={setAction} options={["create", "update", "delete", "approve", "reject", "receive", "confirm", "deliver", "mark_paid", "read"]} />
        <input
          type="date"
          aria-label="Start date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
        <input
          type="date"
          aria-label="End date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>
      {error ? <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {loading ? <LoadingSpinner /> : (
        <DataTable
          columns={[
            { key: "created_at", label: "Date" },
            { key: "module", label: "Module" },
            { key: "action", label: "Action" },
            { key: "entity_name", label: "Entity" },
            { key: "entity_id", label: "Entity ID" },
          ]}
          data={filtered}
        />
      )}
    </div>
  );
}
