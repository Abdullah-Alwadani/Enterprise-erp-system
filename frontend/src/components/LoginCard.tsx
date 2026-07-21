import type { ReactNode } from "react";

export function LoginCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-7 shadow-xl">
      {children}
    </div>
  );
}
