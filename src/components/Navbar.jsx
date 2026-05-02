import { useState } from "react";
import { Home, Menu, X, Heart, User, LogOut, MapPinned } from "lucide-react";

export default function Navbar({ page, setPage, user, setUser, savedCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", value: "home" },
    { label: "Buy", value: "buy" },
    { label: "Rent", value: "rent" },
    { label: "Markets", value: "listings" },
    { label: "Dashboard", value: "dashboard" },
    { label: "Saved", value: "saved" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <Home size={16} className="text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-white block leading-none">
                Nest<span className="text-brand-500">Finder</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 flex items-center gap-1 mt-1">
                <MapPinned size={10} /> ✦ Find. Tour. Move In.
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setPage(link.value)}
                className={`text-sm font-medium transition-colors relative ${
                  page === link.value
                    ? "text-brand-500"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {link.value === "saved" && savedCount > 0 && (
                  <span className="ml-1.5 bg-brand-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {savedCount}
                  </span>
                )}
                {page === link.value && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500 font-semibold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="text-white/40 hover:text-white transition-colors"
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setPage("login")}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setPage("signup")}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/70 hover:text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-white/5 px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => { setPage(link.value); setMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                page === link.value
                  ? "bg-brand-500/10 text-brand-500"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
              {link.value === "saved" && savedCount > 0 && (
                <span className="ml-2 bg-brand-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {savedCount}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-white/5 flex gap-2">
            {user ? (
              <button onClick={() => { setUser(null); setMenuOpen(false); }} className="btn-secondary text-sm py-2 px-4 w-full">
                Sign Out
              </button>
            ) : (
              <>
                <button onClick={() => { setPage("login"); setMenuOpen(false); }} className="btn-secondary text-sm py-2 px-4 flex-1">Sign In</button>
                <button onClick={() => { setPage("signup"); setMenuOpen(false); }} className="btn-primary text-sm py-2 px-4 flex-1">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
