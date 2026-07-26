"use client";

import React from "react";
import AnimatedShuffleGallery from "@/components/AnimatedShuffleGallery";

export default function WorkGallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm border border-primary-blue/20">
            Our Work Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Crafted With Passion & Precision
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Explore our creative portfolio of high-impact video productions, social media campaigns, digital ads, and web engineering.
          </p>
        </div>

        {/* Animated Floating Card Shuffle Gallery Component */}
        <AnimatedShuffleGallery />

      </div>
    </section>
  );
}
