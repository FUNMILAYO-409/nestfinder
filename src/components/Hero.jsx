import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { cities, metroShortcuts, searchSuggestions } from "../data";

export default function Hero({ onSearch, marketStats = [] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [city, setCity] = useState("All Cities");

  const handleSearch = () => {
    onSearch({ query, type, city });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Search every major
          <span className="text-brand-500 block">U.S. home market</span>
        </h1>

        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Compare homes, rentals, and neighborhoods across the United States with live prices, saved listings, and map-driven search.
        </p>

        {/* Search Bar */}
        <div className="bg-dark-800/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto animate-fade-up shadow-2xl" style={{ animationDelay: '0.3s' }}>
          {/* Listing Type Toggle */}
          <div className="flex bg-dark-700 rounded-xl p-1 gap-1">
            {["All", "sale", "rent"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  type === t
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {t === "All" ? "All" : t === "sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          {/* City Select */}
          <div className="relative flex-shrink-0">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field pl-9 pr-8 py-2.5 appearance-none cursor-pointer text-sm"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-dark-800">{c}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by area, street, landmark..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              list="hero-search-suggestions"
              className="input-field pl-9 py-2.5 text-sm"
            />
            <datalist id="hero-search-suggestions">
              {searchSuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          </div>

          <button onClick={handleSearch} className="btn-primary py-2.5 px-6 flex items-center gap-2 justify-center">
            <Search size={16} />
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-5 animate-fade-up" style={{ animationDelay: '0.35s' }}>
          {metroShortcuts.map((metro) => (
            <button
              key={metro}
              onClick={() => onSearch({ query: metro, type: "All", city: metro })}
              className="px-4 py-2 rounded-full text-xs sm:text-sm bg-dark-800/80 border border-white/10 text-white/70 hover:text-white hover:border-brand-500/40 transition-all"
            >
              {metro}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {marketStats.length > 0
            ? marketStats.map((stat) => (
                <div key={stat.label} className="text-center max-w-[180px]">
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                  <div className="text-[11px] text-white/25 mt-2 uppercase tracking-[0.18em]">
                    {stat.changeLabel || stat.hint}
                  </div>
                </div>
              ))
            : [
                { value: "$689K", label: "Median sale price" },
                { value: "$3,420", label: "Average rent" },
                { value: "50 states", label: "Coverage" },
                { value: "24/7", label: "Live search" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
