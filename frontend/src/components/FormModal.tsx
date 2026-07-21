import { useEffect, useState } from "react";

import type { FormField, RecordItem } from "../types/crud";

function formatValueForInput(field: FormField, value: unknown) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  if (field.type === "datetime-local" && text.includes("T")) {
    return text.slice(0, 16);
  }
  return text;
}

export function FormModal({
  open,
  title,
  fields,
  initialValue,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  fields: FormField[];
  initialValue?: RecordItem | null;
  onClose: () => void;
  onSubmit: (payload: Record<string, unknown>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const nextValues: Record<string, string> = {};
    fields.forEach((field) => {
      const value = initialValue?.[field.name];
      nextValues[field.name] = formatValueForInput(field, value);
    });
    setValues(nextValues);
  }, [fields, initialValue, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl"
        onSubmit={(event) => {
          event.preventDefault();
          const payload: Record<string, unknown> = {};
          fields.forEach((field) => {
            const value = values[field.name];
            if (value !== "") {
              payload[field.name] =
                field.type === "number" || field.name.endsWith("_id")
                  ? Number(value)
                  : value;
            }
          });
          onSubmit(payload);
        }}
      >
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
              <span className="text-sm font-medium text-slate-700">{field.label}</span>
              {field.type === "select" && (field.options?.length ?? 0) > 0 ? (
                <select
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Select {field.label}</option>
                  {(field.options ?? []).map((option) => (
                    <option key={String(option.value)} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "select" ? (
                <div>
                  <input
                    required={field.required}
                    type="number"
                    step="1"
                    value={values[field.name] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                  <p className="mt-1 text-xs text-slate-500">Related records could not be loaded for this role; enter the record ID manually.</p>
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="mt-1 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              ) : (
                <input
                  required={field.required}
                  type={field.type ?? "text"}
                  step={field.type === "number" ? "any" : undefined}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</button>
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Save</button>
        </div>
      </form>
    </div>
  );
}
