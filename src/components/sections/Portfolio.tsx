"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Maximize2, Sparkles, X } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: "web" | "video" | "marketing" | "branding";
  categoryLabel: string;
  image: string;
  description: string;
  tag: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "High-Performance Next.js Web Platform",
    category: "web",
    categoryLabel: "Web Dev",
    image: "/gallery/work5.jpg",
    description: "Sub-second responsive enterprise architecture with interactive motion components.",
    tag: "Next.js 16",
  },
  {
    id: 2,
    title: "Cinematic Commercial Video Production",
    category: "video",
    categoryLabel: "Video & Reels",
    image: "/gallery/work1.jpg",
    description: "High-impact video campaign with 4K color grading and kinetic visual motion.",
    tag: "4K Cinema",
  },
  {
    id: 3,
    title: "Omnichannel Social Media Growth Strategy",
    category: "marketing",
    categoryLabel: "Digital Ads",
    image: "/gallery/work2.jpg",
    description: "Multi-platform lead generation campaign driving 4.8X Return on Ad Spend.",
    tag: "Viral Reach",
  },
  {
    id: 4,
    title: "Brand Visual Identity & Graphic Suite",
    category: "branding",
    categoryLabel: "Branding",
    image: "/gallery/work4.jpg",
    description: "Comprehensive corporate brand guidelines, logos, and promotional collateral.",
    tag: "Design System",
  },
  {
    id: 5,
    title: "AI-Driven Paid Media Campaign",
    category: "marketing",
    categoryLabel: "Digital Ads",
    image: "/gallery/work3.jpg",
    description: "Targeted Google & Meta ad funnels engineered for peak acquisition conversion.",
    tag: "High ROAS",
  },
  {
    id: 6,
    title: "Custom Interactive Portfolio Portal",
    category: "web",
    categoryLabel: "Web Dev",
    image: "/gallery/work1.jpg",
    description: "Custom web app built with React, Framer Motion physics, and Tailwind CSS.",
    tag: "Interactive",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = PORTFOLIO_ITEMS.filter((item) =>
    activeCategory === "all" ? true : item.category === activeCategory
  );

  return (
    <section id="portfolio" className="relative py-24 px-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-blue/20 shadow">
            Client Success Portals
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Featured Creative Work
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Explore how we combine web engineering, video production, and performance ads to deliver extraordinary growth.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 mt-10">
            {[
              { id: "all", label: "All Projects" },
              { id: "web", label: "Web Dev" },
              { id: "video", label: "Video & Reels" },
              { id: "marketing", label: "Digital Ads" },
              { id: "branding", label: "Branding" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 border-2 ${
                  activeCategory === tab.id
                    ? "bg-primary-blue text-bg-yellow border-primary-blue shadow-lg scale-105"
                    : "glassmorphism text-foreground border-primary-blue/10 hover:border-primary-blue/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="group p-5 rounded-[28px] glassmorphism-card border-2 border-primary-blue/10 hover:border-primary-blue/40 shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden"
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-slate-950 mb-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-primary-blue text-bg-yellow px-2.5 py-1 rounded-full shadow border border-white/20">
                      {item.categoryLabel}
                    </span>

                    <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-wider bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10 flex items-center gap-1">
                      <Sparkles size={10} className="text-bg-yellow" />
                      {item.tag}
                    </span>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-9 h-9 rounded-full bg-primary-blue text-bg-yellow flex items-center justify-center shadow-lg">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-foreground group-hover:text-primary-blue transition-colors line-clamp-1 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-foreground/75 font-semibold leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full glassmorphism-card p-4 sm:p-6 rounded-[32px] border-2 border-primary-blue shadow-2xl overflow-hidden cursor-default"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-primary-blue text-bg-yellow font-black text-sm flex items-center justify-center shadow-xl border border-bg-yellow/40 hover:scale-110 transition-transform"
              >
                <X size={18} />
              </button>

              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 max-h-[70vh] flex items-center justify-center mb-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[68vh] object-contain mx-auto rounded-[20px]"
                />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-primary-blue text-bg-yellow px-3 py-1 rounded-full">
                  {selectedItem.categoryLabel}
                </span>
                <h3 className="text-xl font-black text-foreground mt-2">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-foreground/80 font-medium mt-1">
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
