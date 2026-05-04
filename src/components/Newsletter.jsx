import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-br from-brand-500/20 via-dark-800 to-dark-800 border border-brand-500/20 rounded-3xl p-10 overflow-hidden text-center">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Mail size={24} className="text-brand-500" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Never Miss a Listing
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8">
            Get new properties that match your criteria delivered straight to your inbox. 
            Be first in line before listings go public.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium">
              <CheckCircle size={20} />
              You're on the list! We'll notify you of new listings.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="input-field flex-1"
              />
              <button onClick={handleSubmit} className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
                Get Alerts <ArrowRight size={16} />
              </button>
            </div>
          )}

          <p className="text-white/20 text-xs mt-4">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
