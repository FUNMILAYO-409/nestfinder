import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { cities, propertyTypes, priceRanges } from "../data";

export default function Filters({ filters, setFilters, total }) {
  const [open, setOpen] = useState(false);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ city: "All Cities", type: "All Types", listing: "All", price: 0, beds: 0 });
  };

  const activeCount = [
    filters.city !== "All Cities",
    filters.type !== "All Types",
    filters.listing !== "All",
    filters.price !== 0,
    filters.beds !== 0,
  ].filter(Boolean).length;

  return (
    <div className="mb-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            open || activeCount > 0
              ? "border-brand-500 text-brand-500 bg-brand-500/10"
              : "border-white/10 text-white/60 hover:border-white/30"
          }`}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeCount > 0 && (
            <span className="bg-brand-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Quick Listing Toggle */}
        <div className="flex bg-dark-800 border border-white/10 rounded-xl p-1 gap-1">
          {["All", "sale", "rent"].map((t) => (
            <button
              key={t}
              onClick={() => updateFilter("listing", t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filters.listing === t
                  ? "bg-brand-500 text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {t === "All" ? "All" : t === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <span className="text-white/40 text-sm ml-auto">
          {total} {total === 1 ? "property" : "properties"} found
        </span>

        {/* Clear */}
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {open && (
        <div className="bg-dark-800 border border-white/10 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in">
          {/* City */}
          <div>
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">City</label>
            <div className="relative">
              <select
                value={filters.city}
                onChange={(e) => updateFilter("city", e.target.value)}
                className="input-field py-2 text-sm appearance-none cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-dark-800">{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">Property Type</label>
            <div className="relative">
              <select
                value={filters.type}
                onChange={(e) => updateFilter("type", e.target.value)}
                className="input-field py-2 text-sm appearance-none cursor-pointer"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t} className="bg-dark-800 capitalize">{t === "All Types" ? "All Types" : t === "house" ? "House" : "Apartment"}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">Price Range</label>
            <div className="relative">
              <select
                value={filters.price}
                onChange={(e) => updateFilter("price", Number(e.target.value))}
                className="input-field py-2 text-sm appearance-none cursor-pointer"
              >
                {priceRanges.map((r, i) => (
                  <option key={i} value={i} className="bg-dark-800">{r.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">Min. Bedrooms</label>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => updateFilter("beds", n)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    filters.beds === n
                      ? "bg-brand-500 text-white"
                      : "bg-dark-700 text-white/40 hover:text-white hover:bg-dark-600"
                  }`}
                >
                  {n === 0 ? "Any" : n === 5 ? "5+" : n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
