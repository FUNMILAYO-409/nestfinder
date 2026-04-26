import { Heart, Bed, Bath, Square, MapPin, Star } from "lucide-react";

export default function PropertyCard({ property, onSelect, onSave, isSaved }) {
  const { title, type, listing, price, location, bedrooms, bathrooms, area, image, featured, new: isNew } = property;
  const pricePerSqFt = Math.max(1, Math.round(price / area));

  const formatPrice = (p, listing) => {
    if (listing === "rent") return `$${p.toLocaleString()}`;
    if (p >= 1000000) return `$${(p / 1000000).toFixed(2)}M`;
    if (p >= 1000) return `$${(p / 1000).toFixed(0)}K`;
    return `$${p}`;
  };

  return (
    <div className="card group cursor-pointer" onClick={() => onSelect(property)}>
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`tag font-semibold uppercase tracking-wide ${
            listing === "sale"
              ? "bg-brand-500 text-white"
              : "bg-emerald-500 text-white"
          }`}>
            {listing === "sale" ? "For Sale" : "For Rent"}
          </span>
          {isNew && (
            <span className="tag bg-white text-dark-900 font-semibold">New</span>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onSave(property.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSaved
              ? "bg-brand-500 text-white"
              : "bg-black/40 text-white hover:bg-brand-500"
          }`}
        >
          <Heart size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-yellow-500/90 text-black text-xs font-semibold px-2 py-1 rounded-full">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-2xl font-display font-bold text-brand-500">
              {formatPrice(price, listing)}
            </span>
            {listing === "rent" && (
              <span className="text-white/40 text-sm ml-1">/mo</span>
            )}
          </div>
          <span className="text-xs text-white/30 capitalize bg-white/5 px-2 py-1 rounded-full">
            {type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-white text-sm mb-2 leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors">
          {title}
        </h3>

        <p className="text-white/35 text-xs mb-3">
          About ${pricePerSqFt.toLocaleString()} per sq ft · U.S. market
        </p>

        {/* Location */}
        <div className="flex items-center gap-1 text-white/40 text-xs mb-4">
          <MapPin size={12} />
          <span>{location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-white/50 text-xs">
          <div className="flex items-center gap-1.5">
            <Bed size={13} className="text-brand-500/70" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={13} className="text-brand-500/70" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={13} className="text-brand-500/70" />
            <span>{area.toLocaleString()} ft²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
