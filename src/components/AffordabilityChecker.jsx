import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function AffordabilityChecker() {
  const [income, setIncome] = useState(150000);
  const [debts, setDebts] = useState(1200);
  const [downPayment, setDownPayment] = useState(90000);
  const [rate, setRate] = useState(6.6);

  const result = useMemo(() => {
    const monthlyIncome = income / 12;
    const maxHousing = monthlyIncome * 0.28;
    const availableForPITI = Math.max(0, maxHousing - debts);
    const monthlyRate = rate / 100 / 12;
    const n = 30 * 12;
    const factor = monthlyRate === 0 ? n : (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const loanAmount = availableForPITI > 0 ? availableForPITI / factor : 0;
    const maxPrice = loanAmount + downPayment;

    return {
      maxHousing,
      maxPrice,
      loanAmount,
    };
  }, [income, debts, downPayment, rate]);

  return (
    <div className="bg-dark-800 border border-white/10 rounded-3xl p-6 space-y-4">
      <h3 className="font-display text-2xl text-white">Affordability Checker</h3>
      <p className="text-white/45 text-sm">Estimate how much home you can afford based on income, debt, and rates.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm text-white/60">Annual household income
          <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value) || 0)} className="input-field mt-1" />
        </label>
        <label className="text-sm text-white/60">Monthly debt payments
          <input type="number" value={debts} onChange={(e) => setDebts(Number(e.target.value) || 0)} className="input-field mt-1" />
        </label>
        <label className="text-sm text-white/60">Down payment
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value) || 0)} className="input-field mt-1" />
        </label>
        <label className="text-sm text-white/60">Interest rate (%)
          <input type="number" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="input-field mt-1" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-dark-700/70 border border-white/5 rounded-2xl p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Max home price</p>
          <p className="text-xl font-display text-white">{currency.format(Math.round(result.maxPrice))}</p>
        </div>
        <div className="bg-dark-700/70 border border-white/5 rounded-2xl p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Estimated loan</p>
          <p className="text-xl font-display text-white">{currency.format(Math.round(result.loanAmount))}</p>
        </div>
        <div className="bg-dark-700/70 border border-white/5 rounded-2xl p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Target housing budget</p>
          <p className="text-xl font-display text-white">{currency.format(Math.round(result.maxHousing))}/mo</p>
        </div>
      </div>
    </div>
  );
}
