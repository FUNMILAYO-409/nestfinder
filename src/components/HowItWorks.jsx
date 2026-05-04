import { Search, CalendarCheck, KeyRound, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <Search size={28} />,
    step: "01",
    title: "Search & Discover",
    desc: "Browse thousands of verified listings across all 50 states. Use our smart filters to narrow down by city, price, size, and amenities. Save your favorites with one click.",
    color: "from-brand-500/20 to-brand-600/5",
    border: "border-brand-500/30",
  },
  {
    icon: <CalendarCheck size={28} />,
    step: "02",
    title: "Tour & Connect",
    desc: "Schedule in-person or virtual 360° tours directly through NestFinder. Chat with NAR-certified agents who know every neighborhood inside out and are ready to guide you.",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
  },
  {
    icon: <KeyRound size={28} />,
    step: "03",
    title: "Move In",
    desc: "Complete your purchase or lease securely through our verified escrow process. Our team handles the paperwork so all you have to do is pack your bags and move in.",
    color: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/30",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/60 font-medium mb-4">
          Simple Process
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          How NestFinder Works
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto">
          From searching to signing — we make finding your next home the easiest thing you'll do all year.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
        {/* Connecting Line */}
        <div className="hidden sm:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-500/50 via-emerald-500/50 to-purple-500/50" />

        {steps.map((step, i) => (
          <div key={step.step} className="relative">
            <div className={`bg-gradient-to-br ${step.color} border ${step.border} rounded-2xl p-6 h-full hover:-translate-y-1 transition-all duration-300`}>
              {/* Step Number */}
              <div className="flex items-center justify-between mb-5">
                <div className={`w-14 h-14 bg-dark-800 rounded-2xl flex items-center justify-center text-brand-500 border ${step.border}`}>
                  {step.icon}
                </div>
                <span className="font-display text-5xl font-bold text-white/5">{step.step}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>

            {/* Arrow between steps */}
            {i < steps.length - 1 && (
              <div className="sm:hidden flex justify-center my-3">
                <ArrowRight size={20} className="text-white/20 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-white/40 text-sm mb-4">Join over 120,000 Americans who found their home with NestFinder</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="btn-primary flex items-center gap-2">
            Start Your Search <ArrowRight size={16} />
          </button>
          <button className="btn-secondary">
            Talk to an Agent
          </button>
        </div>
      </div>
    </section>
  );
}
