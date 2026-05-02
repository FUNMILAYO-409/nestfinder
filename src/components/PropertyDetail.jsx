import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Bed,
  Bath,
  Square,
  MapPin,
  CheckCircle,
  Share2,
  Calculator,
  Clock3,
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  School,
} from "lucide-react";
import ContactForm from "./ContactForm";
import PriceHistoryChart from "./PriceHistoryChart";

export default function PropertyDetail({ property, onBack, onSave, isSaved, similarProperties = [], onOpenProperty }) {
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pricePerSqFt = Math.max(1, Math.round(property.price / property.area));
  const estimatedMonthlyPayment = Math.round((property.price * 0.0065) / 12 + (property.price * 0.0015) / 12);

  const formatPrice = (p) => {
    if (property.listing === "rent") return `$${p.toLocaleString()}`;
    if (p >= 1000000) return `$${(p / 1000000).toFixed(2)}M`;
    return `$${p.toLocaleString()}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextImage = () => {
    setActiveImg((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImg((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden space-y-2">
            <div className="relative h-72 sm:h-96 overflow-hidden rounded-2xl">
              <button onClick={() => setLightboxOpen(true)} className="w-full h-full">
                <img src={property.images[activeImg]} alt={property.title} className="w-full h-full object-cover transition-all duration-500" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <span className={`absolute top-4 left-4 tag font-semibold ${property.listing === "sale" ? "bg-brand-500 text-white" : "bg-emerald-500 text-white"}`}>
                {property.listing === "sale" ? "For Sale" : "For Rent"}
              </span>
              <button
                onClick={() => window.open(property.virtualTourUrl, "_blank", "noopener,noreferrer")}
                className="absolute top-4 right-4 bg-black/70 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/85"
              >
                Virtual 360 Tour
              </button>
            </div>

            {property.images.length > 1 && (
              <div className="flex gap-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-brand-500" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">{property.title}</h1>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <MapPin size={14} className="text-brand-500" />
                {property.location}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                title="Share"
              >
                {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Share2 size={16} />}
              </button>
              <button
                onClick={() => onSave(property.id)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  isSaved
                    ? "bg-brand-500/20 border-brand-500 text-brand-500"
                    : "bg-dark-800 border-white/10 text-white/50 hover:border-brand-500/50 hover:text-brand-500"
                }`}
              >
                <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-white/40 text-xs mb-1">Price</p>
                <p className="text-3xl font-display font-bold text-brand-500">
                  {formatPrice(property.price)}
                  {property.listing === "rent" && <span className="text-base text-white/30 ml-1 font-sans">/mo</span>}
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-1.5 text-white mb-1">
                    <Bed size={16} className="text-brand-500" />
                    <span className="text-lg font-semibold">{property.bedrooms}</span>
                  </div>
                  <p className="text-white/40 text-xs">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1.5 text-white mb-1">
                    <Bath size={16} className="text-brand-500" />
                    <span className="text-lg font-semibold">{property.bathrooms}</span>
                  </div>
                  <p className="text-white/40 text-xs">Bathrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1.5 text-white mb-1">
                    <Square size={16} className="text-brand-500" />
                    <span className="text-lg font-semibold">{property.area.toLocaleString()}</span>
                  </div>
                  <p className="text-white/40 text-xs">Sq. Ft.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-dark-800/80 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
                <BadgeDollarSign size={12} />
                Price / sq ft
              </div>
              <p className="text-xl font-display font-bold text-white">${pricePerSqFt.toLocaleString()}</p>
            </div>
            <div className="bg-dark-800/80 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
                <Calculator size={12} />
                Est. payment
              </div>
              <p className="text-xl font-display font-bold text-white">${estimatedMonthlyPayment.toLocaleString()}/mo</p>
            </div>
            <div className="bg-dark-800/80 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
                <Clock3 size={12} />
                Market pace
              </div>
              <p className="text-xl font-display font-bold text-white">Active now</p>
            </div>
            <div className="bg-dark-800/80 border border-white/10 rounded-2xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Walk Score</p>
              <p className="text-xl font-display font-bold text-white">{property.walkScore}</p>
            </div>
            <div className="bg-dark-800/80 border border-white/10 rounded-2xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Transit Score</p>
              <p className="text-xl font-display font-bold text-white">{property.transitScore}</p>
            </div>
          </div>

          <PriceHistoryChart points={property.priceHistory} listing={property.listing} />

          <div>
            <h2 className="font-display text-xl text-white mb-3">About This Property</h2>
            <p className="text-white/60 leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-white mb-4">Amenities & Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2.5 bg-dark-800 border border-white/5 rounded-xl px-4 py-3">
                  <CheckCircle size={14} className="text-brand-500 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 text-brand-500 text-sm">
              <School size={14} />
              School ratings nearby
            </div>
            <div className="space-y-3">
              {property.schools?.map((school) => (
                <div key={school.name} className="flex items-center justify-between border border-white/10 rounded-xl p-3 bg-dark-700/60">
                  <p className="text-white/80 text-sm">{school.name}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-500/20 text-brand-500">{school.rating}/10</span>
                </div>
              ))}
            </div>
          </div>

          {similarProperties.length > 0 && (
            <div>
              <h2 className="font-display text-xl text-white mb-4">Similar properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {similarProperties.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onOpenProperty(item)}
                    className="text-left bg-dark-800 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/40 transition-colors"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-28 object-cover" />
                    <div className="p-3">
                      <p className="text-white text-sm line-clamp-1">{item.title}</p>
                      <p className="text-white/40 text-xs mt-1">{item.city}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <ContactForm agent={property.agent} property={property} />

          <div className="bg-dark-800/50 border border-white/5 rounded-xl p-4">
            <p className="text-white/30 text-xs leading-relaxed">
              Safety tip: <strong className="text-white/50">Stay safe:</strong> Never send money before viewing a property.
            </p>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-5 right-5 text-white/70 hover:text-white text-sm border border-white/20 rounded-full px-4 py-2">
            Close
          </button>
          <button onClick={prevImage} className="absolute left-4 sm:left-8 text-white/80 hover:text-white">
            <ChevronLeft size={34} />
          </button>
          <img src={property.images[activeImg]} alt={property.title} className="max-h-[85vh] max-w-full object-contain rounded-2xl" />
          <button onClick={nextImage} className="absolute right-4 sm:right-8 text-white/80 hover:text-white">
            <ChevronRight size={34} />
          </button>
        </div>
      )}
    </div>
  );
}
