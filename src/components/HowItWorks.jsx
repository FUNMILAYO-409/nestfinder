import { useState } from "react";
import { Search, CalendarCheck, KeyRound, ArrowRight, Mail, Phone, User } from "lucide-react";

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

export default function HowItWorks({ setPage }) {
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleAgentInquiry = () => {
    const subject = encodeURIComponent("NestFinder Agent Inquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:tischendorf_lee@yahoo.com?subject=${subject}&body=${body}`;
  };

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
          <button onClick={() => setPage("listings")} className="btn-primary flex items-center gap-2">
            Start Your Search <ArrowRight size={16} />
          </button>
          <button onClick={() => setShowAgentForm((prev) => !prev)} className="btn-secondary">
            Talk to an Agent
          </button>
        </div>
      </div>

      {showAgentForm && (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5 text-white font-semibold">
              <User size={18} className="text-brand-500" />
              Send a message to an agent
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                className="input-field"
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                className="input-field"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                className="input-field sm:col-span-2"
              />
              <textarea
                rows={4}
                placeholder="How can the agent help you?"
                value={form.message}
                onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
                className="input-field sm:col-span-2 resize-none"
              />
            </div>

            <button onClick={handleAgentInquiry} className="btn-primary mt-4 w-full sm:w-auto flex items-center gap-2">
              <Mail size={16} />
              Email Agent
            </button>
          </div>

          <div className="bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-wider text-brand-500 font-semibold mb-3">Agent Contact</p>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Tischendorf Lee</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Licensed agent available to answer questions about listings, tours, and next steps.
            </p>

            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-500" />
                <a href="mailto:tischendorf_lee@yahoo.com" className="hover:text-white transition-colors">
                  tischendorf_lee@yahoo.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-brand-500" />
                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
