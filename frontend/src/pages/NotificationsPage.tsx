import { useEffect, useMemo, useState } from "react";

import { listItems, postAction } from "../api/crud";
import { getApiErrorMessage } from "../api/client";
import { DataTable } from "../components/DataTable";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { StatusBadge } from "../components/StatusBadge";
import type { RecordItem } from "../types/crud";

export function NotificationsPage() {
  const [items, setItems] = useState<RecordItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      setItems(await listItems("/notifications"));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => items.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase())), [items, search]);

  return (
    <div className="space-y-5">
      <PageHeader title="Notifications" description="Review workflow alerts and mark notifications as read." />
      <SearchInput value={search} onChange={setSearch} />
      {error ? <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {loading ? <LoadingSpinner /> : (
        <DataTable
          columns={[
            { key: "title", label: "Title" },
            { key: "message", label: "Message" },
            { key: "notification_type", label: "Type" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status ?? "")} /> },
          ]}
          data={filtered}
          actions={(item) => (
            <button onClick={async () => { await postAction(`/notifications/${item.id}/read`); await load(); }} className="rounded-md px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50">
              Mark read
            </button>
          )}
        />
      )}
    </div>
  );
}
