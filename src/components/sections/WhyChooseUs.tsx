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
      id: "ui-ux-designer",
      name: "UI/UX Graphic Designer",
      strength: "UI/UX & Graphic Design",
      powerName: "Visual & Interface Architecture",
      powerLevel: 98,
      emoji: "🎨",
      image: "/heroes/ui_ux_designer.jpg",
      bgGradient: "from-amber-400 via-rose-500 to-indigo-600",
      description: "Crafts intuitive UI/UX interface designs, brand visual identities, high-converting ad posters, and aesthetic design systems.",
      specialAction: "🎨 Architecting stunning UI/UX design systems!",
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

  const activeHero = heroes.find((h) => h.id === selectedHero) || heroes[0];

  return (
    <section id="why-us" className="relative py-24 px-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-blue/20 shadow">
            Meet the First Zone Heroes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Elite Squad of Digital Specialist Powerhouses
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Choose your specialist champion below to inspect their superpower skills, tools, and execution capabilities.
          </p>
        </div>

        {/* Hero Selector Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {heroes.map((hero) => {
            const isSelected = selectedHero === hero.id;
            return (
              <button
                key={hero.id}
                onClick={() => setSelectedHero(hero.id)}
                onMouseEnter={() => setHoveredHero(hero.id)}
                onMouseLeave={() => setHoveredHero(null)}
                className={`relative p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                  isSelected
                    ? "bg-primary-blue text-bg-yellow border-primary-blue shadow-lg scale-105"
                    : "glassmorphism text-foreground border-primary-blue/10 hover:border-primary-blue/30"
                }`}
                data-cursor={hero.cursor}
              >
                {/* Hero Avatar / Image Thumbnail */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 mb-2 bg-slate-900 flex items-center justify-center text-xl shadow">
                  {hero.image ? (
                    <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
                  ) : (
                    hero.emoji
                  )}
                </div>

                <span className="text-[11px] font-black tracking-wider uppercase text-center line-clamp-1">
                  {hero.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Hero Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHero.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="rounded-[36px] glassmorphism-card border-2 border-primary-blue/20 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Avatar Photo Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-primary-blue/30 shadow-2xl bg-slate-950 group">
                {activeHero.image ? (
                  <img
                    src={activeHero.image}
                    alt={activeHero.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${activeHero.bgGradient} flex items-center justify-center text-7xl`}>
                    {activeHero.emoji}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="mt-4">
                <span className="text-xs font-black uppercase tracking-widest text-primary-blue dark:text-accent-blue bg-primary-blue/10 dark:bg-accent-blue/10 px-3 py-1 rounded-full border border-primary-blue/20">
                  {activeHero.strength}
                </span>
              </div>
            </div>

            {/* Right: Powers & Special Abilities Info */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{activeHero.emoji}</span>
                <h3 className="text-2xl sm:text-4xl font-black text-foreground">
                  {activeHero.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-foreground/80 font-medium leading-relaxed mb-6">
                {activeHero.description}
              </p>

              {/* Power Level Meter */}
              <div className="mb-6 bg-slate-900/40 p-4 rounded-2xl border border-primary-blue/10">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2 text-foreground">
                  <span>Special Ability: {activeHero.powerName}</span>
                  <span className="text-primary-blue dark:text-accent-blue">{activeHero.powerLevel}% POWER</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-primary-blue/20">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${activeHero.bgGradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${activeHero.powerLevel}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Special Action Action Badge */}
              <div className="p-4 rounded-2xl bg-primary-blue/10 border border-primary-blue/20 flex items-center gap-3">
                <Zap size={20} className="text-primary-blue dark:text-accent-blue animate-bounce flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {activeHero.specialAction}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
