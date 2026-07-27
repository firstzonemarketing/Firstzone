"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Zap, Compass, Heart, Activity } from "lucide-react";

interface Hero {
  id: string;
  name: string;
  strength: string;
  powerName: string;
  powerLevel: number;
  emoji: string;
  image?: string;
  bgGradient: string;
  description: string;
  specialAction: string;
  cursor: string;
}

export default function WhyChooseUs() {
  const [selectedHero, setSelectedHero] = useState<string>("director");
  const [hoveredHero, setHoveredHero] = useState<string | null>(null);

  const heroes: Hero[] = [
    {
      id: "director",
      name: "Director",
      strength: "Executive & Growth Lead",
      powerName: "Omnichannel Command",
      powerLevel: 99,
      emoji: "🎬",
      image: "/heroes/director.jpg",
      bgGradient: "from-blue-600 via-indigo-600 to-amber-500",
      description: "Drives creative visual direction, high-impact digital marketing strategy, and brand transformation campaigns.",
      specialAction: "🚀 Orchestrates viral campaign ignition!",
      cursor: "rocket",
    },
    {
      id: "developer",
      name: "Developer",
      strength: "Web & Tech Engineering",
      powerName: "React & API Architecture",
      powerLevel: 98,
      emoji: "💻",
      image: "/heroes/developer.jpg",
      bgGradient: "from-cyan-500 via-blue-600 to-indigo-600",
      description: "Engineers sub-second responsive websites, web apps, custom API integrations, and high-converting landing pages.",
      specialAction: "⚡ Deploys fast, clean production code!",
      cursor: "pointer",
    },
    {
      id: "media-exec",
      name: "Media Executive",
      strength: "Video & Media Production",
      powerName: "Cinematic Production",
      powerLevel: 96,
      emoji: "🎥",
      image: "/heroes/media_executive.jpg",
      bgGradient: "from-purple-500 via-indigo-600 to-emerald-500",
      description: "Oversees commercial videography, high-end video editing, motion graphics, and high-converting reels production.",
      specialAction: "🎬 Produces 4K cinema media assets!",
      cursor: "sword",
    },
    {
      id: "content-creator",
      name: "Content Creator & Client Relations",
      strength: "Content & Business Dev",
      powerName: "Viral Engagement & Growth",
      powerLevel: 97,
      emoji: "✨",
      image: "/heroes/content_creator.jpg",
      bgGradient: "from-yellow-400 via-amber-500 to-rose-500",
      description: "Crafts engaging social content, manages client relationships, and drives strategic business development growth.",
      specialAction: "💡 Expands client alliances & reach!",
      cursor: "pointer",
    },
    {
      id: "data",
      name: "AI & Growth Specialist",
      strength: "Data & Funnel Science",
      powerName: "Funnel Analytics",
      powerLevel: 95,
      emoji: "🧪",
      bgGradient: "from-emerald-400 to-teal-600",
      description: "Monitors ad campaign analytics, conversion heatmaps, and AI target modeling for maximum ROI.",
      specialAction: "🧬 Computes conversion models!",
      cursor: "pointer",
    },
    {
      id: "support",
      name: "Client Success Guardian",
      strength: "24/7 Client Support",
      powerName: "Ping Shield Barrier",
      powerLevel: 96,
      emoji: "🤖",
      bgGradient: "from-pink-500 to-orange-500",
      description: "Ensures 24/7 campaign uptime, rapid client communication, and seamless project execution.",
      specialAction: "🛡️ Deploys client campaign shields!",
      cursor: "pointer",
    },
  ];

  const activeHero = heroes.find(h => h.id === selectedHero) || heroes[0];

  return (
    <section id="why-us" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-blue/20 shadow">
            Elite Squad
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Meet the First Zone Heroes
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Explore our elite squad of agency leaders and growth champions. Select a hero to inspect their special marketing skills.
          </p>
        </div>

        {/* Character Selection Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Interactive Character Grid Selector */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {heroes.map((hero) => {
              const isSelected = selectedHero === hero.id;
              const isHovered = hoveredHero === hero.id;

              return (
                <motion.div
                  key={hero.id}
                  onClick={() => setSelectedHero(hero.id)}
                  onMouseEnter={() => setHoveredHero(hero.id)}
                  onMouseLeave={() => setHoveredHero(null)}
                  data-cursor={hero.cursor}
                  className={`p-5 rounded-[28px] glassmorphism-card border-2 cursor-pointer flex flex-col items-center justify-between text-center select-none relative overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? "border-primary-blue shadow-2xl scale-[1.04] ring-2 ring-primary-blue/20"
                      : "border-primary-blue/10 hover:border-primary-blue/30"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Glowing background ring on hover/select */}
                  <AnimatePresence>
                    {(isSelected || isHovered) && (
                      <motion.div
                        className={`absolute inset-0 opacity-10 bg-gradient-to-br ${hero.bgGradient} z-0 pointer-events-none`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Character Avatar Bubble */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${hero.bgGradient} text-3xl flex items-center justify-center text-white shadow-lg relative z-10 overflow-hidden border-2 border-white/30`}
                    animate={
                      isHovered || isSelected
                        ? {
                            scale: [1, 1.12, 1],
                            boxShadow: "0 0 25px rgba(46, 78, 216, 0.45)",
                          }
                        : {}
                    }
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {hero.image ? (
                      <img src={hero.image} alt={hero.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      hero.emoji
                    )}
                  </motion.div>

                  <div className="mt-4 relative z-10">
                    <h3 className="font-extrabold text-foreground text-xs sm:text-sm leading-tight line-clamp-2">
                      {hero.name}
                    </h3>
                    <p className="text-[10px] font-black text-primary-blue dark:text-accent-blue tracking-wider uppercase mt-1">
                      {hero.strength}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Immersive Character Stat Visualizer Sheet */}
          <div className="lg:col-span-6">
            <motion.div
              key={activeHero.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="h-full p-8 rounded-[32px] glassmorphism border-2 border-primary-blue/20 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeHero.bgGradient} text-3xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-white/30 flex-shrink-0`}>
                      {activeHero.image ? (
                        <img src={activeHero.image} alt={activeHero.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        activeHero.emoji
                      )}
                    </span>
                    <div>
                      <span className="text-[10px] font-black text-primary-blue dark:text-accent-blue tracking-widest uppercase">
                        SQUAD CHAMPION
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground">{activeHero.name}</h3>
                    </div>
                  </div>

                  <span className="text-xs font-black uppercase tracking-wider bg-primary-blue/10 text-primary-blue px-3 py-1.5 rounded-full border border-primary-blue/20">
                    {activeHero.strength}
                  </span>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed font-semibold mb-6">
                  {activeHero.description}
                </p>

                {/* Energy Action Box */}
                <div className="bg-primary-blue/10 dark:bg-slate-800/40 p-4 rounded-2xl border border-primary-blue/20 text-xs font-bold text-primary-blue dark:text-accent-blue flex items-center gap-2 mb-8 animate-pulse">
                  <Activity size={16} />
                  <span>SPECIAL SKILL: {activeHero.specialAction}</span>
                </div>
              </div>

              {/* Stat progress bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-foreground/70 mb-2">
                  <span>SPECIAL POWER: {activeHero.powerName}</span>
                  <span className="text-primary-blue dark:text-accent-blue">{activeHero.powerLevel}%</span>
                </div>
                <div className="w-full h-3.5 bg-primary-blue/10 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-primary-blue/20">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${activeHero.bgGradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${activeHero.powerLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
