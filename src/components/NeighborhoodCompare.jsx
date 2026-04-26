import { MapPin, School, TrainFront, TimerReset, TrendingUp, DollarSign, BadgeDollarSign } from "lucide-react";
import { neighborhoodInsights } from "../data";

export default function NeighborhoodCompare({ metroDashboards = [], neighborhoods = [] }) {
  const neighborhoodList = neighborhoods.length > 0 ? neighborhoods : neighborhoodInsights;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      <div>
        <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
          <TrendingUp size={14} />
          Live metro dashboard
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Track the strongest U.S. metros in real time</h2>
            <p className="text-white/45 mt-2 max-w-3xl">
              These dashboard cards are computed from the latest housing series and your current listing inventory.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-white/60">
            <span className="metric-chip"><BadgeDollarSign size={12} /> Affordability</span>
            <span className="metric-chip"><DollarSign size={12} /> Median pricing</span>
            <span className="metric-chip"><TrendingUp size={12} /> Momentum</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {metroDashboards.map((metro) => (
            <div key={`${metro.city}-${metro.state}`} className="bg-dark-800/80 border border-white/10 rounded-3xl p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    {metro.city}, {metro.state}
                  </p>
                  <p className="text-white/40 text-sm mt-1">{metro.trendLabel}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 font-semibold">
                  {metro.momentum}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-white/50">
                  <span>Listings</span>
                  <span>{metro.listings}</span>
                </div>
                <div className="flex items-center justify-between text-white/50">
                  <span>Avg price</span>
                  <span>{metro.avgPrice}</span>
                </div>
                <div className="flex items-center justify-between text-white/50">
                  <span>Avg rent</span>
                  <span>{metro.avgRent}</span>
                </div>
                <div className="flex items-center justify-between text-white/50">
                  <span>Price / sq ft</span>
                  <span>{metro.avgPricePerSqFt}</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between text-white/50 mb-1">
                    <span>Affordability</span>
                    <span>{metro.affordabilityScore}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${metro.affordabilityScore}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mb-3">
          <MapPin size={14} />
          Neighborhood comparison
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Compare U.S. neighborhoods side by side</h2>
            <p className="text-white/45 mt-2 max-w-3xl">
              A live snapshot of walkability, transit, schools, and lifestyle quality across the most searched metros.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-white/60">
            <span className="metric-chip"><School size={12} /> School quality</span>
            <span className="metric-chip"><TrainFront size={12} /> Transit access</span>
            <span className="metric-chip"><TimerReset size={12} /> Lifestyle pace</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {neighborhoodList.map((neighborhood) => (
            <div key={neighborhood.city} className="bg-dark-800/80 border border-white/10 rounded-3xl p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    {neighborhood.city}, {neighborhood.state}
                  </p>
                  <p className="text-white/40 text-sm mt-1">{neighborhood.lifestyle}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 font-semibold">
                  {neighborhood.score}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex items-center justify-between text-white/50 mb-1">
                    <span>Walkability</span>
                    <span>{neighborhood.walkability}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${neighborhood.walkability}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-white/50 mb-1">
                    <span>Transit</span>
                    <span>{neighborhood.transit}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${neighborhood.transit}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-white/50 mb-1">
                    <span>Schools</span>
                    <span>{neighborhood.schools}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${neighborhood.schools}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}