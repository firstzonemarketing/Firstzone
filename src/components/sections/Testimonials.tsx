"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarEmoji: string;
  bgGradient: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marcus Miller",
      role: "Marketing Director",
      company: "Apex Retailers",
      quote: "First Zone didn't just redesign our storefront; they completely transformed our organic acquisition funnel. Our ROI surged in the first 90 days. Unbelievable work!",
      avatarEmoji: "🦁",
      bgGradient: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Sophia Martinez",
      role: "CEO",
      company: "CloudWare SaaS",
      quote: "The cartoon mascots and interactive interface of our landing page created a visual identity that customers remember. Conversions are up 45%! Highly creative crew.",
      avatarEmoji: "🦊",
      bgGradient: "from-yellow-400 to-amber-500",
    },
    {
      id: 3,
      name: "Dave Jenkins",
      role: "Founder",
      company: "Active Apparel",
      quote: "Excellent video marketing campaigns and stellar web development work. Their performance marketing team optimization is unmatched. Fast delivery always.",
      avatarEmoji: "🐼",
      bgGradient: "from-emerald-400 to-teal-600",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Happy Clients
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            What the Crew Says About Us
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -50 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="w-full"
            >
              {/* Speech Bubble Container */}
              <div className="relative p-8 sm:p-10 rounded-3xl glassmorphism border-2 border-primary-blue/15 shadow-xl">
                
                {/* Speech Bubble Pointer Arrow */}
                <div className="absolute bottom-[-16px] left-12 sm:left-1/2 sm:-translate-x-1/2 w-8 h-8 bg-white/70 dark:bg-slate-800/80 border-r-2 border-b-2 border-primary-blue/15 rotate-45 pointer-events-none" />

                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatDelay: 4 }}
                    >
                      <Star size={18} fill="currentColor" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-foreground/90 font-medium italic leading-relaxed mb-6">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </p>

                {/* Left and Right navigation buttons integrated into the card */}
                <div className="absolute top-1/2 transform -translate-y-1/2 inset-x-[-20px] sm:inset-x-[-40px] flex justify-between pointer-events-none">
                  <motion.button
                    onClick={handlePrev}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center border border-primary-blue/20 text-foreground pointer-events-auto shadow-md hover:bg-primary-blue/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft size={16} />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center border border-primary-blue/20 text-foreground pointer-events-auto shadow-md hover:bg-primary-blue/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Reviewer Details (Below Speech Bubble) */}
              <div className="mt-8 flex items-center justify-start sm:justify-center gap-4 pl-8 sm:pl-0">
                {/* Cartoon avatar bubble */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].bgGradient} flex items-center justify-center text-3xl shadow-md border-2 border-white`}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {testimonials[activeIndex].avatarEmoji}
                </motion.div>
                <div>
                  <h4 className="font-extrabold text-foreground text-base">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-xs text-foreground/75 font-semibold">
                    {testimonials[activeIndex].role} &bull;{" "}
                    <span className="text-primary-blue dark:text-accent-blue font-bold">
                      {testimonials[activeIndex].company}
                    </span>
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
