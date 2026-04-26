import { MapPin, X } from "lucide-react";
import { useState } from "react";

export default function MapView({ properties, onSelect }) {
  const [tooltip, setTooltip] = useState(null);

  // Simple visual map using SVG-like positioning within a styled container
  // In production you'd use Mapbox or Google Maps API
  const mapBounds = {
    minLat: 24.0,
    maxLat: 50.0,
    minLng: -126.0,
    maxLng: -66.0,
  };

  const toPercent = (lat, lng) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.min(Math.max(x, 5), 95), y: Math.min(Math.max(y, 5), 95) };
  };

  const formatPrice = (p, listing) => {
    if (listing === "rent") return `$${p.toLocaleString()}`;
    if (p >= 1000000) return `$${(p / 1000000).toFixed(1)}M`;
    return `$${(p / 1000).toFixed(0)}K`;
  };

  const cityLabels = Object.values(
    properties.reduce((accumulator, property) => {
      if (!accumulator[property.city]) {
        accumulator[property.city] = {
          name: property.city,
          lat: property.lat,
          lng: property.lng,
        };
      }
      return accumulator;
    }, {})
  );

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 map-placeholder" style={{ height: "520px" }}>
      {/* Map Label */}
      <div className="absolute top-4 left-4 z-10 bg-dark-900/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
        <p className="text-white/60 text-xs font-medium">📍 U.S. Property Map</p>
        <p className="text-white/30 text-xs mt-0.5">Prices shown in USD. Click a pin to view the listing.</p>
      </div>

      {/* City Labels */}
      {cityLabels.map((city) => {
        const pos = toPercent(city.lat, city.lng);
        return (
          <div
            key={city.name}
            className="absolute text-white/20 text-xs font-medium pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y - 4}%`, transform: "translateX(-50%)" }}
          >
            {city.name}
          </div>
        );
      })}

      {/* Property Pins */}
      {properties.map((p) => {
        const pos = toPercent(p.lat, p.lng);
        const isActive = tooltip?.id === p.id;
        return (
          <div
            key={p.id}
            className="absolute z-20 cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -100%)",
            }}
            onClick={() => setTooltip(isActive ? null : p)}
          >
            {/* Pin */}
            <div className={`relative flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold shadow-lg border transition-all duration-200 ${
              isActive
                ? "bg-brand-500 text-white border-white scale-110"
                : p.listing === "sale"
                ? "bg-dark-900 text-brand-500 border-brand-500/50 hover:scale-105"
                : "bg-dark-900 text-emerald-400 border-emerald-500/50 hover:scale-105"
            }`}>
              <MapPin size={10} />
              {formatPrice(p.price, p.listing)}
            </div>
            {/* Stem */}
            <div className={`w-0.5 h-2 mx-auto ${isActive ? "bg-brand-500" : "bg-white/20"}`} />
          </div>
        );
      })}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-30 bg-dark-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl w-64 animate-fade-in"
          style={{
            left: `${Math.min(toPercent(tooltip.lat, tooltip.lng).x, 65)}%`,
            top: `${Math.min(toPercent(tooltip.lat, tooltip.lng).y + 4, 65)}%`,
          }}
        >
          <div className="relative">
            <img src={tooltip.image} alt={tooltip.title} className="w-full h-32 object-cover" />
            <button
              onClick={() => setTooltip(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80"
            >
              <X size={12} />
            </button>
            <span className={`absolute bottom-2 left-2 tag text-xs font-semibold ${tooltip.listing === "sale" ? "bg-brand-500 text-white" : "bg-emerald-500 text-white"}`}>
              {tooltip.listing === "sale" ? "For Sale" : "For Rent"}
            </span>
          </div>
          <div className="p-3">
            <p className="text-white font-semibold text-sm line-clamp-1 mb-1">{tooltip.title}</p>
            <p className="text-white/40 text-xs mb-2 flex items-center gap-1">
              <MapPin size={10} /> {tooltip.location}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-brand-500 font-bold">
                {formatPrice(tooltip.price, tooltip.listing)}{tooltip.listing === "rent" && <span className="text-white/30 text-xs">/mo</span>}
              </span>
              <button
                onClick={() => onSelect(tooltip)}
                className="text-xs bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-dark-900/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 space-y-1">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-3 h-3 rounded-full bg-brand-500" />
          For Sale
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          For Rent
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-dark-900/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 text-xs text-white/50">
        {properties.length} matching listings
      </div>
    </div>
  );
}
