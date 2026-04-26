import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Home } from "lucide-react";

export default function Auth({ mode, setPage, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!isLogin && !form.name) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setUser({ name: isLogin ? form.email.split("@")[0] : form.name, email: form.email });
      setPage("home");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/30">
            <Home size={24} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome back" : "Join NestFinder"}
          </h1>
          <p className="text-white/40 text-sm">
            {isLogin
              ? "Sign in to access your saved listings and more"
              : "Create your free account to save listings and connect with agents across the United States"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-dark-800 border border-white/10 rounded-2xl p-8 space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs text-white/50 font-medium uppercase tracking-wider block mb-2">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Emeka Okafor"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="input-field"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-white/50 font-medium uppercase tracking-wider block mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input-field"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 font-medium uppercase tracking-wider block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="input-field pr-11"
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          {isLogin && (
            <div className="text-right">
              <button className="text-sm text-brand-500 hover:underline">Forgot password?</button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isLogin ? "Sign In" : "Create Account"}
          </button>

          <p className="text-center text-white/40 text-sm pt-2">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setPage(isLogin ? "signup" : "login")}
              className="text-brand-500 hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors mx-auto mt-6 text-sm"
        >
          <ArrowLeft size={14} />
          Back to NestFinder
        </button>
      </div>
    </div>
  );
}
