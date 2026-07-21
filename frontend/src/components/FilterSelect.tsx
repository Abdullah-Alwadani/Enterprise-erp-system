export function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<string | { label: string; value: string | number }>;
  onChange: (value: string) => void;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">All {label}</option>
      {options.map((option) => (
        <option key={typeof option === "string" ? option : String(option.value)} value={typeof option === "string" ? option : option.value}>
          {typeof option === "string" ? option : option.label}
        </option>
      ))}
    </select>
  );
}
