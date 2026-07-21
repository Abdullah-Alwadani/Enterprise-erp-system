import { Edit, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import type { RecordItem, TableColumn } from "../types/crud";
import { EmptyState } from "./EmptyState";

export function DataTable<T extends RecordItem>({
  columns,
  data,
  onEdit,
  onDelete,
  actions,
}: {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  actions?: (item: T) => ReactNode;
}) {
  if (data.length === 0) return <EmptyState />;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete || actions) ? <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                    {column.render ? column.render(item) : String(item[column.key] ?? "")}
                  </td>
                ))}
                {(onEdit || onDelete || actions) ? (
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      {actions?.(item)}
                      {onEdit ? <button title="Edit" onClick={() => onEdit(item)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"><Edit className="h-4 w-4" /></button> : null}
                      {onDelete ? <button title="Delete" onClick={() => onDelete(item)} className="rounded-md p-2 text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button> : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
