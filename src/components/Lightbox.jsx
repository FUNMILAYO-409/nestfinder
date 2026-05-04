import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-10"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/70 text-sm px-4 py-1.5 rounded-full z-10">
        {current + 1} / {images.length}
      </div>

      {/* Main Image */}
      <div
        className="relative max-w-5xl max-h-[80vh] mx-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl animate-fade-in"
          key={current}
        />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-brand-500 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-brand-500 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
              current === i ? "border-brand-500 scale-110" : "border-white/20 opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
