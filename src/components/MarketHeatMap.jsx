export default function MarketHeatMap({ zones = [] }) {
  const toColor = (heat) => {
    if (heat >= 85) return "bg-red-500/70";
    if (heat >= 75) return "bg-orange-500/70";
    if (heat >= 65) return "bg-yellow-500/70";
    return "bg-sky-500/70";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-6">
        <h2 className="font-display text-3xl text-white">Market Heat Map</h2>
        <p className="text-white/45 mt-2">Color-coded demand intensity across your covered metros.</p>
      </div>

      <div className="bg-dark-800 border border-white/10 rounded-3xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {zones.map((zone) => (
            <div key={zone.city} className="rounded-2xl border border-white/10 bg-dark-700/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-semibold">{zone.city}</p>
                <span className={`w-3 h-3 rounded-full ${toColor(zone.heat)}`} />
              </div>
              <p className="text-white/45 text-xs">Heat score: {zone.heat}</p>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-brand-500" style={{ width: `${zone.heat}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
