import { useMemo, useState } from "react";
import { Calculator, Banknote, Home, Percent } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function MortgageCalculator({ price }) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.75);
  const [termYears, setTermYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.15);
  const [insuranceRate, setInsuranceRate] = useState(0.35);

  const results = useMemo(() => {
    const downPayment = price * (downPaymentPercent / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = termYears * 12;

    const principalAndInterest =
      monthlyRate === 0
        ? loanAmount / totalPayments
        : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));

    const monthlyPropertyTax = (price * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = (price * (insuranceRate / 100)) / 12;
    const totalMonthly = principalAndInterest + monthlyPropertyTax + monthlyInsurance;

    return {
      downPayment,
      loanAmount,
      principalAndInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      totalMonthly,
    };
  }, [downPaymentPercent, insuranceRate, interestRate, price, propertyTaxRate, termYears]);

  const Control = ({ label, value, onChange, min, max, step, suffix }) => (
    <label className="block space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/40">
        <span>{label}</span>
        <span>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-orange-500"
      />
    </label>
  );

  return (
    <div className="bg-dark-800 border border-white/10 rounded-3xl p-6 space-y-6">
      <div className="flex items-center gap-2 text-brand-500 text-sm font-medium">
        <Calculator size={14} />
        Mortgage affordability
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-dark-700/80 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-white/35 text-xs uppercase tracking-[0.18em] mb-2">
            <Home size={12} />
            Home price
          </div>
          <p className="text-2xl font-display font-bold text-white">{formatCurrency(price)}</p>
        </div>
        <div className="bg-dark-700/80 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-white/35 text-xs uppercase tracking-[0.18em] mb-2">
            <Banknote size={12} />
            Total monthly cost
          </div>
          <p className="text-2xl font-display font-bold text-white">{formatCurrency(Math.round(results.totalMonthly))}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Control label="Down payment" value={downPaymentPercent} onChange={setDownPaymentPercent} min={5} max={40} step={1} suffix="%" />
        <Control label="Interest rate" value={interestRate} onChange={setInterestRate} min={4} max={10} step={0.05} suffix="%" />
        <Control label="Loan term" value={termYears} onChange={setTermYears} min={15} max={30} step={5} suffix=" years" />
        <Control label="Property tax" value={propertyTaxRate} onChange={setPropertyTaxRate} min={0.5} max={2.5} step={0.05} suffix="%" />
        <Control label="Insurance" value={insuranceRate} onChange={setInsuranceRate} min={0.15} max={0.8} step={0.05} suffix="%" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/5 bg-dark-700/60 p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Estimated down payment</p>
          <p className="text-lg font-semibold text-white">{formatCurrency(results.downPayment)}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-dark-700/60 p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Loan amount</p>
          <p className="text-lg font-semibold text-white">{formatCurrency(results.loanAmount)}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-dark-700/60 p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Principal & interest</p>
          <p className="text-lg font-semibold text-white">{formatCurrency(Math.round(results.principalAndInterest))}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-dark-700/60 p-4">
          <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-2">Tax + insurance</p>
          <p className="text-lg font-semibold text-white">
            {formatCurrency(Math.round(results.monthlyPropertyTax + results.monthlyInsurance))}
          </p>
        </div>
      </div>

      <p className="text-white/35 text-xs leading-relaxed">
        Estimate only. Actual monthly payment depends on credit, escrow, HOA dues, and lender terms.
      </p>
    </div>
  );
}