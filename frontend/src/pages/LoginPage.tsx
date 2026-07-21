import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Building2, Lock, Mail, ShieldCheck } from "lucide-react";

import { login } from "../api/auth";
import { getApiErrorMessage } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { LoginCard } from "../components/LoginCard";
import { getToken, setToken } from "../utils/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@erp.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (getToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(email, password);
      setToken(response.access_token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <LoginCard>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-950">Enterprise ERP</p>
            <p className="text-sm text-slate-500">Secure operations workspace</p>
          </div>
        </div>
        <div className="mt-7">
          <h1 className="text-2xl font-bold text-slate-950">Sign in to your account</h1>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Access dashboards, module workflows, reports, notifications, and audit history.
          </p>
        </div>
          {error ? <div className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
          <label className="mt-5 block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
            </div>
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
            </div>
          </label>
          <ActionButton disabled={loading} className="mt-6 w-full" icon={<ShieldCheck className="h-4 w-4" />}>
            {loading ? "Signing in..." : "Sign in"}
          </ActionButton>
          <section className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Demo credentials</p>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <p><span className="font-semibold text-slate-800">Admin:</span> admin@erp.com / admin123</p>
              <p><span className="font-semibold text-slate-800">HR Manager:</span> hr@erp.com / password123</p>
              <p><span className="font-semibold text-slate-800">Inventory Manager:</span> inventory@erp.com / password123</p>
              <p><span className="font-semibold text-slate-800">Procurement Officer:</span> procurement@erp.com / password123</p>
              <p><span className="font-semibold text-slate-800">Sales Officer:</span> sales@erp.com / password123</p>
              <p><span className="font-semibold text-slate-800">Finance Officer:</span> finance@erp.com / password123</p>
            </div>
          </section>
        </form>
      </LoginCard>
    </main>
  );
}
