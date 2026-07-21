export function LoadingSpinner() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
    </div>
  );
}
