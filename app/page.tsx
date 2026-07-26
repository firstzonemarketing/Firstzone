"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

// Components
import CustomCursor from "@/components/CustomCursor";
import BackgroundElements from "@/components/BackgroundElements";
import Navbar from "@/components/Navbar";
import EasterEggs from "@/components/EasterEggs";
import AnimeSpeedLines from "@/components/AnimeSpeedLines";

// Sections
import Hero from "@/components/sections/Hero";
import WorkGallery from "@/components/sections/WorkGallery";
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

        {/* Animated Work Gallery Section */}
        <WorkGallery />

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

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-primary-blue/10 bg-white-custom/10 py-12 px-6 text-center text-xs font-bold text-foreground/60 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="tracking-wide">
            © 2026 First Zone Digital Marketing. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Made with 💙, 💛, and a team of{" "}
            <a href="/admin-leads" className="text-primary-blue dark:text-accent-blue hover:underline font-bold" data-cursor="pointer">
              cartoon robots
            </a>.
          </span>
        </div>
      </footer>
    </div>
  );
}
