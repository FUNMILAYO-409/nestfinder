import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function PriceHistory({ price }) {
  // Generate realistic price history based on current price
  const history = useMemo(() => {
    const months = ["Jun '24", "Jul '24", "Aug '24", "Sep '24", "Oct '24", "Nov '24", "Dec '24", "Jan '25", "Feb '25", "Mar '25", "Apr '25", "May '25"];
    let p = price * 0.88;
    return months.map((month, i) => {
      const change = (Math.random() - 0.35) * 0.04;
      p = p * (1 + change);
      if (i === months.length - 1) p = price;
      return { month, price: Math.round(p) };
    });
  }, [price]);

  const min = Math.min(...history.map((h) => h.price));
  const max = Math.max(...history.map((h) => h.price));
  const range = max - min;
  const firstPrice = history[0].price;
  const lastPrice = history[history.length - 1].price;
  const change = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(1);
  const isUp = lastPrice >= firstPrice;

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  // SVG path
  const w = 600;
  const h = 120;
  const pad = { left: 20, right: 20, top: 15, bottom: 15 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;

  const points = history.map((d, i) => {
    const x = pad.left + (i / (history.length - 1)) * innerW;
    const y = pad.top + innerH - ((d.price - min) / (range || 1)) * innerH;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `M ${points[0]} L ${points.join(" L ")} L ${pad.left + innerW},${pad.top + innerH} L ${pad.left},${pad.top + innerH} Z`;

  return (
    <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg font-bold text-white">Price History</h3>
          <p className="text-white/40 text-xs">Last 12 months</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${isUp ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isUp ? "+" : ""}{change}%
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: "120px" }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#areaGrad)" />
          <path d={pathD} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dots */}
          {history.map((d, i) => {
            const x = pad.left + (i / (history.length - 1)) * innerW;
            const y = pad.top + innerH - ((d.price - min) / (range || 1)) * innerH;
            return (
              <circle key={i} cx={x} cy={y} r={i === history.length - 1 ? 5 : 3}
                fill={i === history.length - 1 ? "#f97316" : "#1a1a1a"}
                stroke="#f97316" strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      {/* X Labels */}
      <div className="flex justify-between mt-2 px-1">
        {history.filter((_, i) => i % 3 === 0 || i === history.length - 1).map((d) => (
          <span key={d.month} className="text-white/30 text-xs">{d.month}</span>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex justify-between mt-4 pt-4 border-t border-white/5">
        <div>
          <p className="text-white/30 text-xs mb-1">12 Months Ago</p>
          <p className="text-white font-semibold text-sm">{fmt(firstPrice)}</p>
        </div>
        <div className="text-right">
          <p className="text-white/30 text-xs mb-1">Current Price</p>
          <p className="text-brand-500 font-semibold text-sm">{fmt(lastPrice)}</p>
        </div>
      </div>
    </div>
  );
}
