import PropertyCard from "./PropertyCard";
import { properties } from "../data";

export default function SimilarProperties({ current, onSelect, onSave, savedIds }) {
  const similar = properties
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.type === current.type || p.city === current.city) &&
        Math.abs(p.price - current.price) / current.price < 0.6
    )
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-white/5">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-white mb-1">Similar Properties</h2>
        <p className="text-white/40 text-sm">You might also like these</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((p) => (
          <PropertyCard
            key={p.id}
            property={p}
            onSelect={onSelect}
            onSave={onSave}
            isSaved={savedIds.includes(p.id)}
          />
        ))}
      </div>
    </section>
  );
}
