import { useState } from "react";
import { ArrowLeft, Heart, Bed, Bath, Square, MapPin, CheckCircle, Share2, ZoomIn, Calculator } from "lucide-react";
import ContactForm from "./ContactForm";
import Lightbox from "./Lightbox";
import PriceHistory from "./PriceHistory";
import MortgageCalculator from "./MortgageCalculator";
import SimilarProperties from "./SimilarProperties";

export default function PropertyDetail({ property, onBack, onSave, isSaved, savedIds, onSelect }) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  const formatPrice = (p) => {
    if (property.listing === "rent") return `$${p.toLocaleString()}`;
    if (p >= 1000000) return `$${(p / 1000000).toFixed(2)}M`;
    return `$${p.toLocaleString()}`;
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openLightbox = (i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={property.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="space-y-2">
              <div className="relative h-72 sm:h-96 overflow-hidden rounded-2xl cursor-zoom-in group" onClick={() => openLightbox(activeImg)}>
                <img src={property.images[activeImg]} alt={property.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={12} /> Click to expand
                </div>
                <span className={`absolute top-4 left-4 tag font-semibold ${property.listing === "sale" ? "bg-brand-500 text-white" : "bg-emerald-500 text-white"}`}>
                  {property.listing === "sale" ? "For Sale" : "For Rent"}
                </span>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">📷 {property.images.length} photos</div>
              </div>
              {property.images.length > 1 && (
                <div className="flex gap-2">
                  {property.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all relative group ${activeImg === i ? "border-brand-500" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" onClick={(e) => { e.stopPropagation(); openLightbox(i); }}>
                        <ZoomIn size={16} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-white/50 text-sm"><MapPin size={14} className="text-brand-500" />{property.location}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={handleShare} className="w-10 h-10 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all" title={copied ? "Copied!" : "Share"}>
                  {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                </button>
                <button onClick={() => onSave(property.id)} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${isSaved ? "bg-brand-500/20 border-brand-500 text-brand-500" : "bg-dark-800 border-white/10 text-white/50 hover:border-brand-500/50 hover:text-brand-500"}`}>
                  <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Price Stats */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-white/40 text-xs mb-1">{property.listing === "rent" ? "Monthly Rent" : "Asking Price"}</p>
                  <p className="text-3xl font-display font-bold text-brand-500">
                    {formatPrice(property.price)}
                    {property.listing === "rent" && <span className="text-base text-white/30 ml-1 font-sans">/mo</span>}
                  </p>
                </div>
                <div className="flex gap-6">
                  {[{ icon: <Bed size={16} className="text-brand-500" />, value: property.bedrooms, label: "Bedrooms" },
                    { icon: <Bath size={16} className="text-brand-500" />, value: property.bathrooms, label: "Bathrooms" },
                    { icon: <Square size={16} className="text-brand-500" />, value: property.area.toLocaleString(), label: "Sq. Ft." }
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="flex items-center gap-1.5 text-white mb-1">{s.icon}<span className="text-lg font-semibold">{s.value}</span></div>
                      <p className="text-white/40 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-white/30 text-xs">About <span className="text-white/50 font-medium">${Math.round(property.price / property.area).toLocaleString()}</span> per sq ft · {property.type === "house" ? "Single Family Home" : "Apartment"}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl text-white mb-3">About This Property</h2>
              <p className="text-white/60 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
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

            {/* Price History */}
            <PriceHistory price={property.price} />

            {/* Mortgage Calculator */}
            {property.listing === "sale" && (
              <div>
                <button onClick={() => setShowCalc(!showCalc)} className="flex items-center gap-2 text-brand-500 hover:text-brand-400 font-medium text-sm mb-4 transition-colors">
                  <Calculator size={16} />
                  {showCalc ? "Hide" : "Show"} Mortgage Calculator
                </button>
                {showCalc && <MortgageCalculator propertyPrice={property.price} />}
              </div>
            )}

            {/* Similar Properties */}
            <SimilarProperties current={property} onSelect={onSelect} onSave={onSave} savedIds={savedIds || []} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <ContactForm agent={property.agent} property={property} />
            <div className="bg-dark-800/50 border border-white/5 rounded-xl p-4">
              <p className="text-white/30 text-xs leading-relaxed">🔒 <strong className="text-white/50">Stay safe:</strong> Never send money before viewing a property. Always verify agents and visit in person before making payments.</p>
            </div>
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <h4 className="font-semibold text-white text-sm mb-4">Quick Facts</h4>
              <div className="space-y-2.5">
                {[
                  { label: "Property Type", value: property.type === "house" ? "Single Family" : "Apartment" },
                  { label: "Listing Type", value: property.listing === "sale" ? "For Sale" : "For Rent" },
                  { label: "Bedrooms", value: property.bedrooms },
                  { label: "Bathrooms", value: property.bathrooms },
                  { label: "Area", value: `${property.area.toLocaleString()} sq ft` },
                  { label: "City", value: property.city },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between items-center text-sm">
                    <span className="text-white/40">{f.label}</span>
                    <span className="text-white font-medium">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
