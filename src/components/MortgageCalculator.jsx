import { useState, useMemo } from "react";
import { Calculator, DollarSign, Percent, Calendar, TrendingDown, X } from "lucide-react";

export default function MortgageCalculator({ propertyPrice = 0, onClose }) {
  const [price, setPrice] = useState(propertyPrice || 350000);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(7.5);
  const [term, setTerm] = useState(30);
  const [tab, setTab] = useState("monthly");

  const calc = useMemo(() => {
    const down = (price * downPercent) / 100;
    const loan = price - down;
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const monthly =
      monthlyRate === 0
        ? loan / n
        : (loan * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - loan;

    // Amortization for first year
    let balance = loan;
    const schedule = [];
    for (let i = 1; i <= Math.min(12, n); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthly - interestPayment;
      balance -= principalPayment;
      schedule.push({
        month: i,
        payment: monthly,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    return { down, loan, monthly, totalPaid, totalInterest, schedule };
  }, [price, downPercent, rate, term]);

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const principalPct = ((calc.loan / calc.totalPaid) * 100).toFixed(0);
  const interestPct = ((calc.totalInterest / calc.totalPaid) * 100).toFixed(0);

  return (
    <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>
      )}

      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 bg-brand-500/20 rounded-xl flex items-center justify-center">
          <Calculator size={18} className="text-brand-500" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-white">Mortgage Calculator</h3>
          <p className="text-white/40 text-xs">Estimate your monthly payments</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Home Price */}
        <div>
          <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
            Home Price
          </label>
          <div className="relative">
            <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="input-field pl-8 text-sm"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
            Down Payment — {fmt(calc.down)}
          </label>
          <div className="relative">
            <input
              type="range"
              min={3}
              max={50}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full accent-orange-500 mt-2"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>3%</span>
              <span className="text-brand-500 font-semibold">{downPercent}%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
            Interest Rate
          </label>
          <div className="relative">
            <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="number"
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="input-field pl-8 text-sm"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="text-xs text-white/40 uppercase tracking-wider font-medium block mb-2">
            Loan Term
          </label>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map((y) => (
              <button
                key={y}
                onClick={() => setTerm(y)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  term === y
                    ? "bg-brand-500 text-white"
                    : "bg-dark-700 text-white/40 hover:text-white hover:bg-dark-600"
                }`}
              >
                {y}yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/30 rounded-2xl p-5 mb-6 text-center">
        <p className="text-white/50 text-sm mb-1">Estimated Monthly Payment</p>
        <p className="font-display text-4xl font-bold text-brand-500">{fmt(calc.monthly)}</p>
        <p className="text-white/30 text-xs mt-1">Principal & Interest only</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Loan Amount", value: fmt(calc.loan), icon: <DollarSign size={13} /> },
          { label: "Total Interest", value: fmt(calc.totalInterest), icon: <TrendingDown size={13} /> },
          { label: "Total Cost", value: fmt(calc.totalPaid), icon: <Calendar size={13} /> },
        ].map((s) => (
          <div key={s.label} className="bg-dark-700 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-brand-500/70 mb-1">{s.icon}</div>
            <p className="text-white font-semibold text-sm">{s.value}</p>
            <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pie Breakdown */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-3">Payment Breakdown</p>
        <div className="flex rounded-full overflow-hidden h-3 mb-3">
          <div
            className="bg-brand-500 transition-all duration-500"
            style={{ width: `${principalPct}%` }}
          />
          <div
            className="bg-white/10 transition-all duration-500"
            style={{ width: `${interestPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            Principal ({principalPct}%)
          </div>
          <div className="flex items-center gap-1.5 text-white/50">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            Interest ({interestPct}%)
          </div>
        </div>
      </div>

      {/* Tabs - Monthly Schedule */}
      <div className="mt-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab("monthly")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${tab === "monthly" ? "bg-brand-500 text-white" : "text-white/40 hover:text-white bg-dark-700"}`}
          >
            First Year Schedule
          </button>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {calc.schedule.map((row) => (
            <div key={row.month} className="flex items-center justify-between bg-dark-700/50 rounded-lg px-3 py-2 text-xs">
              <span className="text-white/30 w-16">Month {row.month}</span>
              <span className="text-brand-500 font-medium">{fmt(row.principal)} principal</span>
              <span className="text-white/40">{fmt(row.interest)} interest</span>
              <span className="text-white/50">{fmt(row.balance)} left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
