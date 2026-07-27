"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { Heart, Code, Sparkles } from "lucide-react";

// Components
import CustomCursor from "@/components/CustomCursor";
import BackgroundElements from "@/components/BackgroundElements";
import Navbar from "@/components/Navbar";
import EasterEggs from "@/components/EasterEggs";
import AnimeSpeedLines from "@/components/AnimeSpeedLines";

// Sections
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CreativeSpectrum from "@/components/sections/CreativeSpectrum";
import Process from "@/components/sections/Process";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Portfolio from "@/components/sections/Portfolio";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen text-foreground selection:bg-primary-blue selection:text-bg-yellow bg-custom-bg text-custom-fg">
      {/* Immersive Background */}
      <BackgroundElements />

      {/* Interactive Utilities */}
      <CustomCursor />
      <AnimeSpeedLines />
      <EasterEggs />

      {/* Navigation */}
      <Navbar />

      {/* Content Layout */}
      <main className="relative w-full">
        {/* Hero Section */}
        <Hero />

        {/* Interactive Universe Services Section */}
        <Services />

        {/* Ribbon Spread Turnover Creative Spectrum Section */}
        <CreativeSpectrum />

        {/* How We Work 6-Step Rocket Process Section */}
        <Process />

        {/* Why Choose Us Split Section */}
        <WhyChooseUs />

        {/* Masonry / Grid Portfolio Section */}
        <Portfolio />

        {/* Counter Milestones Statistics Section */}
        <Statistics />

        {/* Reviews Speech Bubbles Testimonials Section */}
        <Testimonials />

        {/* Accordions Bounce FAQ Section */}
        <FAQ />

        {/* Form coordinates Contact Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 border-t border-primary-blue/15 glassmorphism-card py-12 px-6 text-center text-xs font-bold text-foreground/80 select-none shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="tracking-wide text-foreground/75 font-bold">
            © 2026 First Zone Digital Marketing. All rights reserved.
          </span>
          <div className="flex items-center gap-2 bg-primary-blue/10 dark:bg-slate-800/80 px-4 py-2 rounded-full border border-primary-blue/20 shadow-md">
            <span className="text-foreground font-black flex items-center gap-1.5 text-xs sm:text-sm">
              Made with <Heart size={15} className="text-red-500 fill-red-500 animate-pulse" /> by the{" "}
              <a 
                href="/admin-leads" 
                className="text-primary-blue dark:text-accent-blue hover:underline font-black flex items-center gap-1 tracking-tight" 
                data-cursor="pointer"
              >
                <Code size={14} className="text-primary-blue" />
                First Zone Developing Team
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
