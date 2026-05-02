import { useMemo, useState } from "react";

const format = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function RentVsBuyTool() {
  const [homePrice, setHomePrice] = useState(750000);
  const [monthlyRent, setMonthlyRent] = useState(3200);
  const [years, setYears] = useState(7);

  const result = useMemo(() => {
    const totalRent = monthlyRent * 12 * years;
    const closingCosts = homePrice * 0.03;
    const maintenance = homePrice * 0.01 * years;
    const appreciation = homePrice * 0.03 * years;
    const netBuyCost = homePrice + closingCosts + maintenance - appreciation;

    return {
      totalRent,
      netBuyCost,
      better: totalRent < netBuyCost ? "Rent" : "Buy",
      delta: Math.abs(totalRent - netBuyCost),
    };
  }, [homePrice, monthlyRent, years]);

  return (
    <div className="bg-dark-800 border border-white/10 rounded-3xl p-6 space-y-4">
      <h3 className="font-display text-2xl text-white">Rent vs Buy</h3>
      <p className="text-white/45 text-sm">Compare a simplified long-term cost of renting and buying.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="text-sm text-white/60">Home price
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value) || 0)} className="input-field mt-1" />
        </label>
        <label className="text-sm text-white/60">Monthly rent
          <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)} className="input-field mt-1" />
        </label>
        <label className="text-sm text-white/60">Time horizon (years)
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 1)} className="input-field mt-1" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-dark-700/70 border border-white/5 rounded-2xl p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Rent total</p>
          <p className="text-xl font-display text-white">{format.format(Math.round(result.totalRent))}</p>
        </div>
        <div className="bg-dark-700/70 border border-white/5 rounded-2xl p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Buy net cost</p>
          <p className="text-xl font-display text-white">{format.format(Math.round(result.netBuyCost))}</p>
        </div>
      </div>

      <p className="text-sm text-white/70">
        Better over {years} years: <span className="text-brand-500 font-semibold">{result.better}</span> by about {format.format(Math.round(result.delta))}.
      </p>
    </div>
  );
}
