import { neighborhoodTrendSeries } from "../data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const labels = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const formatValue = (value, unit) => {
  if (unit === "$") return money.format(value);
  return `${value}${unit}`;
};

export default function NeighborhoodMarketTrends() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-6">
        <h2 className="font-display text-3xl text-white">Neighborhood Market Trends</h2>
        <p className="text-white/45 mt-2">Median price, days on market, and price per sq ft over the last 6 months.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {neighborhoodTrendSeries.map((series) => {
          const max = Math.max(...series.values);
          const min = Math.min(...series.values);
          const range = Math.max(1, max - min);

          return (
            <div key={series.label} className="bg-dark-800 border border-white/10 rounded-3xl p-5">
              <h3 className="font-display text-xl text-white mb-4">{series.label}</h3>
              <div className="space-y-3">
                {series.values.map((value, index) => (
                  <div key={`${series.label}-${labels[index]}`}>
                    <div className="flex justify-between text-xs text-white/45 mb-1">
                      <span>{labels[index]}</span>
                      <span>{formatValue(value, series.unit)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-brand-500" style={{ width: `${Math.max(10, ((value - min) / range) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
