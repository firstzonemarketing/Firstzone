"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

export interface GalleryItem {
  id: string | number;
  src: string;
  title?: string;
  category?: string;
  tag?: string;
  description?: string;
  alt?: string;
}

export interface AnimatedShuffleGalleryProps {
  images?: string[];
  items?: GalleryItem[];
  className?: string;
}

const GALLERY_POSTERS: GalleryItem[] = [
  { id: 1, src: "/gallery/work1.jpg", title: "Creative Visual Production Poster 1", alt: "Creative Visual Production Poster 1" },
  { id: 2, src: "/gallery/work2.jpg", title: "Social Media Campaign Artwork 2", alt: "Social Media Campaign Artwork 2" },
  { id: 3, src: "/gallery/work3.jpg", title: "Digital Ad Design Poster 3", alt: "Digital Ad Design Poster 3" },
  { id: 4, src: "/gallery/work4.jpg", title: "Graphic Brand Identity Poster 4", alt: "Graphic Brand Identity Poster 4" },
  { id: 5, src: "/gallery/work5.jpg", title: "High-Performance Web Architecture 5", alt: "High-Performance Web Architecture 5" },
  { id: 6, src: "/gallery/work1.jpg", title: "Short-Form Video Production Reel 6", alt: "Short-Form Video Production Reel 6" },
];

export default function AnimatedShuffleGallery({ items, images, className = "" }: AnimatedShuffleGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPoster, setSelectedPoster] = useState<GalleryItem | null>(null);

  // Mouse tilt tracking per card
  const [tiltState, setTiltState] = useState<Record<string | number, { rotateX: number; rotateY: number }>>({});

  const displayItems: GalleryItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;
    if (images && images.length > 0) {
      return images.map((img, idx) => ({
        id: idx + 1,
        src: img,
        title: `Work Showcase #${idx + 1}`,
        alt: `Work Showcase #${idx + 1}`,
      }));
    }
    return GALLERY_POSTERS;
  }, [items, images]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string | number) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltState((prev) => ({
      ...prev,
      [id]: { rotateX, rotateY },
    }));
  };

  const handleCardMouseLeave = (id: string | number) => {
    setTiltState((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0 },
    }));
  };

  return (
    <div ref={containerRef} className={`w-full relative select-none ${className}`}>
      
      {/* ------------------------------------------------------------- */}
      {/* RIBBON SPREAD TO CLEAN GRID CONTAINER (2 Rows of 3 Cards)      */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayItems.map((poster, index) => {
          const tilt = tiltState[poster.id] || { rotateX: 0, rotateY: 0 };

          return (
            <motion.div
              key={`${poster.id}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="w-full"
            >
              {/* Interactive Card Container with 3D Tilt & Ribbon Animation */}
              <motion.div
                onClick={() => setSelectedPoster(poster)}
                onMouseMove={(e) => handleCardMouseMove(e, poster.id)}
                onMouseLeave={() => handleCardMouseLeave(poster.id)}
                className="relative w-full aspect-[3/4] cursor-pointer group rounded-[26px]"
                style={{ perspective: "1000px" }}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* 3D Tilt Inner Frame */}
                <motion.div
                  className="w-full h-full rounded-[26px] p-3 glassmorphism-card border-2 border-white/50 dark:border-slate-700/60 group-hover:border-primary-blue dark:group-hover:border-accent-blue shadow-xl group-hover:shadow-[0_0_35px_rgba(46,78,216,0.35)] transition-all duration-300 overflow-hidden"
                  animate={{
                    rotateX: tilt.rotateX,
                    rotateY: tilt.rotateY,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Clean High-Res Poster Canvas */}
                  <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950">
                    <img
                      src={poster.src}
                      alt={poster.title || poster.alt || "Portfolio Artwork"}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Light Gloss Reflection Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Corner Magnifier Icon */}
                    <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-9 h-9 rounded-full bg-primary-blue/90 text-bg-yellow backdrop-blur-md flex items-center justify-center shadow-lg border border-bg-yellow/40">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FULL-SCREEN POSTER LIGHTBOX INSPECTION MODAL                   */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full glassmorphism-card p-3 sm:p-5 rounded-[32px] border-2 border-primary-blue shadow-2xl overflow-hidden cursor-default"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPoster(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-primary-blue text-bg-yellow font-black text-sm flex items-center justify-center shadow-xl border border-bg-yellow/40 hover:scale-110 transition-transform"
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Full Image Display */}
              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 max-h-[80vh] flex items-center justify-center">
                <img
                  src={selectedPoster.src}
                  alt={selectedPoster.title || selectedPoster.alt || "Portfolio Artwork"}
                  className="max-w-full max-h-[78vh] object-contain mx-auto rounded-[20px]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Re-export as AnimatedGallery for backward compatibility
export { AnimatedShuffleGallery as AnimatedGallery };
