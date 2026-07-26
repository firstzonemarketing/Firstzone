"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Layers, Film, TrendingUp, Sparkles, Cpu, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

interface ServiceCard {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: React.ComponentType<any>;
  accentColor: string;
  bgGradient: string;
  badge: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: "web-dev",
    title: "Web Development",
    shortDesc: "Scalable Apps & Speed",
    description: "Scalable websites and web applications built for performance and growth.",
    icon: Code,
    accentColor: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    badge: "ENGINEERING",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    shortDesc: "User-Centered Experience",
    description: "User-focused interfaces crafted for engagement and seamless experiences.",
    icon: Layers,
    accentColor: "from-indigo-500 to-purple-600",
    bgGradient: "from-purple-600/20 via-indigo-600/10 to-transparent",
    badge: "CREATIVE UI",
  },
  {
    id: "video-prod",
    title: "Video Production",
    shortDesc: "Visual Storytelling",
    description: "Creative visual storytelling that captures attention and drives impact.",
    icon: Film,
    accentColor: "from-amber-400 to-yellow-500",
    bgGradient: "from-amber-500/20 via-yellow-600/10 to-transparent",
    badge: "STORYTELLING",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortDesc: "Data-Driven ROI",
    description: "Data-driven campaigns designed to increase reach and conversions.",
    icon: TrendingUp,
    accentColor: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    badge: "GROWTH ROI",
  },
  {
    id: "branding",
    title: "Branding",
    shortDesc: "Distinct Identities",
    description: "Distinct identities that help businesses stand out and stay memorable.",
    icon: Sparkles,
    accentColor: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-600/20 via-rose-600/10 to-transparent",
    badge: "BRAND IDENTITY",
  },
  {
    id: "automation",
    title: "Business Automation",
    shortDesc: "Smart Digital Workflows",
    description: "Smart digital solutions that streamline operations and improve efficiency.",
    icon: Cpu,
    accentColor: "from-cyan-400 to-blue-600",
    bgGradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    badge: "WORKFLOW AI",
  },
];

export default function CreativeSpectrum() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse follow glow state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);

  // Scroll tracking for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Track mouse movements over section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Domino turnover wave effect
  const triggerDominoWave = () => {
    SERVICES.forEach((service, index) => {
      setTimeout(() => {
        setFlippedCards((prev) => ({
          ...prev,
          [service.id]: true,
        }));
      }, index * 180); // Domino sequential flip timing (180ms delay between cards)
    });
  };

  // Domino reverse flip back effect
  const resetDominoWave = () => {
    SERVICES.slice().reverse().forEach((service, index) => {
      setTimeout(() => {
        setFlippedCards((prev) => ({
          ...prev,
          [service.id]: false,
        }));
      }, index * 100);
    });
  };

  // Trigger domino turnover automatically when cursor enters section
  const handleMouseEnterSection = () => {
    setIsHovered(true);
    triggerDominoWave();
  };

  // Automatically reset cards when cursor leaves section
  const handleMouseLeaveSection = () => {
    setIsHovered(false);
    resetDominoWave();
  };

  // Individual card click toggle
  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="creative-spectrum"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-gradient-to-b from-transparent via-primary-blue/5 to-transparent transition-colors duration-500"
    >
      {/* 1. Ambient Particle & Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic Mouse Follow Glow Spotlight */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[120px] transition-all duration-300 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(46, 78, 216, 0.65) 0%, rgba(248, 221, 105, 0.35) 50%, transparent 80%)",
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`,
          }}
        />

        {/* Ambient Parallax Particles */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary-blue/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-44 h-44 rounded-full bg-bg-yellow/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/10 blur-[140px]" />
        </motion.div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2E4ED8_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 2. Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg border border-primary-blue/20"
          >
            <Sparkles size={14} className="animate-spin-slow" />
            <span>Creative Spectrum</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
              if (!hasScrolledIn) {
                setHasScrolledIn(true);
                triggerDominoWave();
              }
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-foreground tracking-tight mb-4"
          >
            Creative Spectrum
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground/80 font-semibold leading-relaxed"
          >
            Where strategy, design, technology, and storytelling come together to create exceptional digital experiences.
          </motion.p>
        </div>

        {/* 3. Automatic Ribbon Spread & Domino 3D Cards Grid */}
        <div className="relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center">
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              const isFlipped = !!flippedCards[service.id];

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full h-72 sm:h-80 cursor-pointer group"
                  onClick={() => toggleCardFlip(service.id)}
                  style={{ perspective: "1200px" }}
                >
                  {/* 3D Flip Card Inner Container */}
                  <motion.div
                    className="relative w-full h-full rounded-[28px] shadow-2xl transform-style-3d transition-transform duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ scale: 1.04, y: -8 }}
                  >
                    {/* ====================================
                        FRONT SIDE OF THE RIBBON CARD
                       ==================================== */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-[28px] p-7 flex flex-col justify-between backface-hidden glassmorphism border border-primary-blue/20 group-hover:border-primary-blue/50 transition-colors shadow-lg overflow-hidden bg-gradient-to-br ${service.bgGradient}`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-primary-blue/15 text-primary-blue dark:text-accent-blue px-3 py-1 rounded-full border border-primary-blue/10">
                          {service.badge}
                        </span>
                        <span className="text-xs font-bold text-foreground/40 font-mono">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Center Minimalist Icon */}
                      <div className="flex flex-col items-center justify-center my-auto text-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${service.accentColor} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent size={32} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs font-bold text-foreground/60">
                          {service.shortDesc}
                        </p>
                      </div>

                      {/* Bottom Prompt */}
                      <div className="flex items-center justify-between pt-3 border-t border-primary-blue/10 text-xs font-black text-primary-blue dark:text-accent-blue">
                        <span>Hover / Move cursor to flip</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>

                    {/* ====================================
                        BACK SIDE OF THE RIBBON CARD
                       ==================================== */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-[28px] p-7 flex flex-col justify-between backface-hidden rotate-y-180 glassmorphism border-2 border-primary-blue/40 shadow-2xl overflow-hidden bg-slate-900/90 dark:bg-slate-950/95 text-white`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r ${service.accentColor} text-white shadow-sm`}>
                          {service.badge}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-bg-yellow font-black text-xs">
                          <CheckCircle2 size={16} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="my-auto space-y-3">
                        <h3 className="text-xl font-black text-white tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Bottom Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-extrabold text-bg-yellow">
                        <span>Click to toggle side</span>
                        <RotateCcw size={14} />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Transition to How We Work */}
        <div className="mt-16 text-center flex flex-col items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-0.5 h-10 bg-gradient-to-b from-primary-blue via-bg-yellow to-transparent rounded-full animate-bounce mb-2" />
          <span className="text-[11px] font-black uppercase tracking-widest text-foreground/60">
            Scroll down for How We Work
          </span>
        </div>

      </div>
    </section>
  );
}
