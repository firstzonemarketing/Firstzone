"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Compass, Palette, Code, Rocket, TrendingUp } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  mascotReaction: string;
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const steps: Step[] = [
    {
      title: "Research",
      description: "We audit your search presence, competitor strategies, and target audience behaviours.",
      icon: Search,
      color: "bg-primary-blue",
      mascotReaction: "🕵️‍♂️ Scanning keywords...",
    },
    {
      title: "Strategy",
      description: "We build a detailed custom marketing and web engineering implementation roadmap.",
      icon: Compass,
      color: "bg-accent-blue",
      mascotReaction: "🗺️ Designing blueprints...",
    },
    {
      title: "Design",
      description: "We craft award-winning, stunning high-fidelity UI assets and brand visuals.",
      icon: Palette,
      color: "bg-primary-blue",
      mascotReaction: "🎨 Mixing primary palettes...",
    },
    {
      title: "Development",
      description: "Our engineers build clean, fast React code and integrate analytics tracking.",
      icon: Code,
      color: "bg-accent-blue",
      mascotReaction: "💻 Compiling components...",
    },
    {
      title: "Launch",
      description: "We push campaigns and products live, running automated tests.",
      icon: Rocket,
      color: "bg-primary-blue",
      mascotReaction: "🚀 Ignition sequence start!",
    },
    {
      title: "Growth",
      description: "Ongoing funnel analysis, scaling budgets, and continuous optimization.",
      icon: TrendingUp,
      color: "bg-accent-blue",
      mascotReaction: "📈 ROI multiplying!",
    },
  ];

  return (
    <section id="process" ref={containerRef} className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Our 6-Step Rocket Process
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            From initial research scanning to viral compound growth, we drive results through a highly organized, step-by-step pipeline.
          </p>
        </div>

        {/* Timeline Structure (Vertical on mobile, grid list) */}
        <div className="relative max-w-3xl mx-auto flex flex-col gap-16">
          
          {/* Central Connecting Timeline Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-1 bg-primary-blue/10 dark:bg-slate-800 rounded-full transform sm:-translate-x-1/2 pointer-events-none" />
          
          {/* Scroll Progress Line Overlay */}
          <motion.div
            className="absolute left-6 sm:left-1/2 top-4 w-1 bg-gradient-to-b from-primary-blue to-accent-blue rounded-full transform sm:-translate-x-1/2 origin-top pointer-events-none"
            style={{
              height: "calc(100% - 32px)",
              scaleY: scrollYProgress,
            }}
          />

          {/* Timeline Nodes */}
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.title}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:justify-start" : "sm:justify-end"
                }`}
              >
                {/* Node bubble point */}
                <motion.div
                  className="absolute left-6 sm:left-1/2 w-6 h-6 rounded-full border-4 border-bg-yellow dark:border-slate-900 bg-primary-blue transform -translate-x-1/2 z-20 flex items-center justify-center cursor-pointer shadow-md"
                  whileHover={{ scale: 1.3 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                </motion.div>

                {/* Card Container */}
                <motion.div
                  className={`w-full sm:w-[45%] ml-12 sm:ml-0 p-6 rounded-3xl glassmorphism border border-primary-blue/10 shadow-md ${
                    isEven ? "sm:mr-auto" : "sm:ml-auto"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-white`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-primary-blue dark:text-accent-blue tracking-widest uppercase">
                        Stage 0{idx + 1}
                      </span>
                      <h3 className="text-lg font-black text-foreground">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-foreground/80 leading-relaxed font-medium mb-3">
                    {step.description}
                  </p>

                  {/* Mascot commentary dialogue box */}
                  <div className="bg-primary-blue/5 dark:bg-slate-800/40 p-2.5 rounded-xl border border-primary-blue/10 text-[10px] font-bold text-primary-blue dark:text-accent-blue flex items-center gap-1.5">
                    <span className="animate-bounce">💡</span>
                    <span>{step.mascotReaction}</span>
                  </div>
                </motion.div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
