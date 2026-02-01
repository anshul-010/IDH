import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    // Demo auth (assumption)
    const ok = email.toLowerCase() === "admin@demo.com" && password === "Admin@123";

    setTimeout(() => {
      setBusy(false);
      if (!ok) return setError("Invalid email or password.");
      localStorage.setItem("demo_authed", "1");
      localStorage.setItem("demo_user", email);
      nav("/", { replace: true });
    }, 350);
  }

  return (
    <div className="min-h-full bg-slate-50">
      {/* Top Bar */}
      <div className="bg-brand-900 text-black">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/15 grid place-items-center font-extrabold">
            dh
          </div>
          <div className="font-extrabold tracking-tight">DataHub</div>
          <div className="ml-auto hidden sm:flex items-center gap-6 text-black/80 text-sm">
            <span>Dashboard</span>
            <span>Calendar</span>
            <span>Help</span>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8">
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-brand-900/10 grid place-items-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-brand-900"
              >
                <path
                  d="M7 10V8a5 5 0 0 1 10 0v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 10h12v10H6V10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="mt-3 text-xl font-extrabold text-slate-900">Sign in</h1>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Email address</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-4 focus:ring-brand-900/10 focus:border-brand-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-4 focus:ring-brand-900/10 focus:border-brand-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <div className="text-sm text-red-600 font-semibold">{error}</div>}

            <button
              type="submit"
              disabled={busy || !email.trim() || !password.trim()}
              className="w-full rounded-xl bg-brand-900 text-black py-2.5 font-bold hover:bg-brand-700 disabled:opacity-60"
            >
              {busy ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center justify-between text-sm">
              <a className="text-brand-700 font-semibold hover:underline" href="#">
                Forgot password?
              </a>
              <a className="text-brand-700 font-semibold hover:underline" href="#">
                Don&apos;t have an account? Sign up
              </a>
            </div>

            <div className="text-xs text-slate-500">
              Demo creds: <b>admin@demo.com</b> / <b>Admin@123</b>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
