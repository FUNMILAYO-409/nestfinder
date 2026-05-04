import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James & Sarah Mitchell",
    location: "New York, NY",
    avatar: "JS",
    rating: 5,
    text: "NestFinder made finding our dream home in Manhattan an absolute breeze. The search filters are incredibly intuitive, and the agent we connected with through the platform was outstanding. We closed in 3 weeks!",
    property: "Bought a 3-bed in Upper West Side",
  },
  {
    name: "Marcus Thompson",
    location: "Los Angeles, CA",
    avatar: "MT",
    rating: 5,
    text: "As a first-time buyer, I was nervous about the whole process. NestFinder's mortgage calculator helped me understand exactly what I could afford, and the verified listings gave me confidence I wasn't being scammed.",
    property: "Bought a condo in Santa Monica",
  },
  {
    name: "Priya Sharma",
    location: "Miami, FL",
    avatar: "PS",
    rating: 5,
    text: "I relocated from Chicago and needed to find a rental fast. Within 48 hours of signing up on NestFinder, I had 3 viewings scheduled and signed my lease within a week. The map view feature is a game changer.",
    property: "Renting in South Beach",
  },
  {
    name: "David & Lisa Chen",
    location: "Seattle, WA",
    avatar: "DC",
    rating: 5,
    text: "The neighborhood insights and price history charts on each listing helped us negotiate $15,000 off the asking price. We felt like we had a data advantage that other buyers didn't. Absolutely love this platform.",
    property: "Bought a home in Capitol Hill",
  },
  {
    name: "Angela Roberts",
    location: "Houston, TX",
    avatar: "AR",
    rating: 5,
    text: "I listed my home through NestFinder and had 12 inquiries in the first week. The agent portal is clean and professional. This is the future of real estate and I'm never going back to traditional methods.",
    property: "Sold a home in River Oaks",
  },
  {
    name: "Tyler Washington",
    location: "Atlanta, GA",
    avatar: "TW",
    rating: 5,
    text: "The saved searches feature with email alerts is phenomenal. I set my criteria and NestFinder notified me the moment a matching property hit the market. That's how I got my place before anyone else could.",
    property: "Renting in Buckhead",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 text-sm text-brand-500 font-medium mb-4">
          <Star size={13} fill="currentColor" />
          Customer Stories
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Loved by 120,000+ Americans
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto">
          Real stories from real people who found their perfect home through NestFinder.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="bg-dark-800 border border-white/5 hover:border-brand-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
          >
            {/* Quote Icon */}
            <Quote size={28} className="text-brand-500/30 mb-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array(t.rating).fill(0).map((_, j) => (
                <Star key={j} size={13} className="text-yellow-400" fill="currentColor" />
              ))}
            </div>

            {/* Text */}
            <p className="text-white/60 text-sm leading-relaxed mb-5">"{t.text}"</p>

            {/* Property Tag */}
            <div className="inline-flex items-center gap-1.5 bg-brand-500/10 text-brand-500 text-xs font-medium px-3 py-1 rounded-full mb-4">
              🏠 {t.property}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500 font-bold text-sm flex-shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/30 text-xs">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="mt-14 bg-dark-800/50 border border-white/5 rounded-2xl p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "4.9/5", label: "Average Rating", sub: "Based on 18,400+ reviews" },
            { value: "120K+", label: "Happy Clients", sub: "Across all 50 states" },
            { value: "98%", label: "Would Recommend", sub: "To friends & family" },
            { value: "< 24hrs", label: "Agent Response", sub: "Average response time" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold text-brand-500">{s.value}</p>
              <p className="text-white font-medium text-sm mt-1">{s.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
