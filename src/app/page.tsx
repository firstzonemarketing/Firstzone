"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

// Components
import CustomCursor from "@/components/CustomCursor";
import BackgroundElements from "@/components/BackgroundElements";
import Navbar from "@/components/Navbar";
import EasterEggs from "@/components/EasterEggs";
import AnimeSpeedLines from "@/components/AnimeSpeedLines";
import Footer from "@/components/Footer";

// Sections
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
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
        {/* 1st Section: Hero */}
        <Hero />

        {/* 2nd Section: How We Work 6-Step Rocket Process Section */}
        <Process />

        {/* 3rd Section: Interactive Universe Services Section */}
        <Services />

        {/* 4th Section: Why Choose Us Split Section */}
        <WhyChooseUs />

        {/* 5th Section: Masonry / Grid Portfolio Section */}
        <Portfolio />

        {/* 6th Section: Counter Milestones Statistics Section */}
        <Statistics />

        {/* 7th Section: Reviews Speech Bubbles Testimonials Section */}
        <Testimonials />

        {/* 8th Section: Accordions Bounce FAQ Section */}
        <FAQ />

        {/* 9th Section: Form coordinates Contact Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
