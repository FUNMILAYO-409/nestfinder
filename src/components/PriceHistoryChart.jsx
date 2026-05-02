const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function PriceHistoryChart({ points = [], listing }) {
  if (!points.length) return null;

  const values = points.map((point) => point.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);

  return (
    <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-white/35 text-xs uppercase tracking-[0.2em]">Price history</p>
          <h3 className="font-display text-xl text-white">How this listing changed over time</h3>
        </div>
        <p className="text-xs text-white/45">
          {listing === "rent" ? "Monthly rent trend" : "Sale price trend"}
        </p>
      </div>

      <div className="space-y-3">
        {points.map((point) => {
          const width = ((point.value - min) / range) * 100;
          return (
            <div key={point.month}>
              <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                <span>{point.month}</span>
                <span>{money.format(point.value)}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.max(12, width)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
