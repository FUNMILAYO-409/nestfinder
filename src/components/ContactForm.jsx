import { useState } from "react";
import { Send, Phone, Mail, CheckCircle } from "lucide-react";

export default function ContactForm({ agent, property }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: `Hi ${agent.name}, I'm interested in "${property.title}". Please get in touch with me.` });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 text-center animate-fade-in">
        <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-emerald-400" />
        </div>
        <h3 className="font-display text-xl text-white mb-2">Message Sent!</h3>
        <p className="text-white/50 text-sm">
          {agent.name} will contact you within 24 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-brand-500 text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
      {/* Agent Info */}
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/5">
        <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500 font-bold text-lg">
          {agent.avatar}
        </div>
        <div>
          <p className="text-white font-semibold">{agent.name}</p>
          <p className="text-white/40 text-xs">U.S. property specialist</p>
        </div>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-2 bg-dark-700 hover:bg-brand-500/10 border border-white/10 hover:border-brand-500/30 rounded-xl py-2.5 text-sm text-white/70 hover:text-brand-500 transition-all"
        >
          <Phone size={14} />
          Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 bg-dark-700 hover:bg-brand-500/10 border border-white/10 hover:border-brand-500/30 rounded-xl py-2.5 text-sm text-white/70 hover:text-brand-500 transition-all"
        >
          <Mail size={14} />
          Email
        </a>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your full name *"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input-field text-sm"
        />
        <input
          type="email"
          placeholder="Email address *"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="input-field text-sm"
        />
        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="input-field text-sm"
        />
        <textarea
          placeholder="Your message..."
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="input-field text-sm resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.email}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={15} />
              Send Message
            </>
          )}
        </button>
      </div>
    </div>
  );
}
